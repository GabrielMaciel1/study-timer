"use client";

import React from "react";
import Link from "next/link";
import logoFull from "../assets/logo-full.webp";
import logoMini from "../assets/logo-mini.jpg";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaChartPie, FaStopwatch } from "react-icons/fa";

export const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => {
  return (
    <aside
      className={`bg-[#471774] text-white ${
        isOpen ? "w-64" : "w-20"
      } h-screen p-4 fixed transition-all duration-300 z-50`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-full transform -translate-x-1/2 bg-white text-[#471774] p-2 rounded-full shadow-md z-50"
      >
        {isOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </button>

      <div className="mb-8 flex items-center justify-center">
        <img
          src={isOpen ? logoFull.src : logoMini.src}
          alt="Logo"
          className={`transition-all duration-300 ${isOpen ? "w-24" : "w-10"}`}
        />
      </div>

      <nav className={`flex flex-col gap-4 ${isOpen ? "items-start" : "items-center"} transition-all duration-300`}>
        <Link href="/timer" className="flex items-center gap-2 hover:underline">
          <FaStopwatch size={20} />
          {isOpen && <span>Cronômetro</span>}
        </Link>
        <Link href="/statistics" className="flex items-center gap-2 hover:underline">
          <FaChartPie size={20} />
          {isOpen && <span>Estatísticas</span>}
        </Link>
      </nav>
    </aside>
  );
};
