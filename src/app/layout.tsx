// app/layout.tsx
"use client";

import React, { useState } from "react";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Providers } from "@/app/providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <html lang="pt-BR">
      <body className="flex bg-gray-100 text-gray-900">
        <Providers>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div
            className={`flex flex-col flex-1 transition-all duration-300 ${
              isSidebarOpen ? "ml-64" : "ml-20"
            }`}
          >
            <main className="">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}