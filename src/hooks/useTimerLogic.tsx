// useTimerLogic.ts
import { useState, useCallback } from "react";
import { useTimerContext } from "@/context/TimerContext";

type TimerMode = "crescente" | "regressiva";
type FormFields = "disciplina" | "tema" | "notes";

const TOOLTIP_TIMEOUT = 3000;

export const useTimerLogic = () => {
  const { timerState, setTimerState, addEntry } = useTimerContext();
    console.log(timerState)
  const [state, setState] = useState({
    showModal: false,
    showTooltip: false,
    formValues: { disciplina: "", tema: "", notes: "" },
    errors: { disciplina: false, tema: false }
  });

  const validateFields = useCallback(() => {
    const newErrors = {
      disciplina: !state.formValues.disciplina.trim(),
      tema: !state.formValues.tema.trim()
    };
    setState(prev => ({ ...prev, errors: newErrors }));
    return !newErrors.disciplina && !newErrors.tema;
  }, [state.formValues.disciplina, state.formValues.tema]);

  const handleStateUpdate = useCallback(
    (update: Partial<typeof state>) => setState(prev => ({ ...prev, ...update })),
    []
  );

  const handleFormChange = useCallback((field: FormFields) => 
    (value: string) => {
      setState(prev => ({
        ...prev,
        formValues: { ...prev.formValues, [field]: value }
      }));
    }, []);

  const showErrorTooltip = useCallback(() => {
    handleStateUpdate({ showTooltip: true });
    setTimeout(() => handleStateUpdate({ showTooltip: false }), TOOLTIP_TIMEOUT);
  }, [handleStateUpdate]);

  const resetTimer = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isRunning: false,
      time: 0
    }));
    setState(prev => ({
      ...prev,
      formValues: { disciplina: "", tema: "", notes: "" },
      errors: { disciplina: false, tema: false }
    }));
  }, [setTimerState]);

  const startTimer = useCallback(() => {
    if (validateFields()) {
      setTimerState(prev => ({ 
        ...prev, 
        isRunning: true,
        lastUpdate: Date.now()
      }));
    } else {
      showErrorTooltip();
    }
  }, [validateFields, showErrorTooltip, setTimerState]);

  const saveTimeHandler = useCallback(() => {
    if (!validateFields()) {
      showErrorTooltip();
      return;
    }

    if (timerState.time > 0) {
      const studiedTime = timerState.mode === 'regressiva' 
        ? (timerState.countdownInput * 60) - timerState.time
        : timerState.time;

      addEntry({
        ...state.formValues,
        tempoEstudado: studiedTime,
        dateStart: new Date(Date.now() - studiedTime * 1000),
        dateEnd: new Date()
      });
      
      setState(prev => ({
        ...prev,
        formValues: { disciplina: "", tema: "", notes: "" }
      }));
      
      resetTimer();
      handleStateUpdate({ showModal: false });
    }
  }, [addEntry, state.formValues, timerState, resetTimer, handleStateUpdate, validateFields, showErrorTooltip]);

  return {
    ...timerState,
    ...state,
    missingFields: Object.entries(state.errors)
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(", "),
    setDisciplina: handleFormChange("disciplina"),
    setTema: handleFormChange("tema"),
    setNotes: handleFormChange("notes"),
    setMode: (mode: TimerMode) => setTimerState(prev => ({ ...prev, mode })),
    setTime: (seconds: number) => setTimerState(prev => ({
      ...prev,
      time: Math.max(0, isNaN(seconds) ? 0 : seconds)
    })),
    setCountdownInput: (value: number) => setTimerState(prev => ({
      ...prev,
      countdownInput: Math.max(1, isNaN(value) ? 1 : value)
    })),
    setShowModal: (value: boolean) => handleStateUpdate({ showModal: value }),
    startTimer,
    pauseTimer: () => setTimerState(prev => ({ ...prev, isRunning: false })),
    resetTimer,
    saveTimeHandler
  };
};