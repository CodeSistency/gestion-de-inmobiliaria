"use client";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: LayoutProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="flex flex-col min-h-screen bg-gray dark:bg-grayDark">
      <header className="bg-primary dark:bg-black text-tertiary dark:text-tertiary shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold">Inmobiliaria</h1>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-secondary dark:hover:text-secondaryDark transition-colors">
                Inicio
              </a>
              <a href="#propiedades" className="hover:text-secondary dark:hover:text-secondaryDark transition-colors">
                Propiedades
              </a>
              <a href="#sobre-nosotros" className="hover:text-secondary dark:hover:text-secondaryDark transition-colors">
                Sobre Nosotros
              </a>
            </nav>
            <Button
              variant="outline"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="bg-secondary dark:bg-secondaryDark text-primary dark:text-primaryDark hover:bg-opacity-90 transition-colors"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-primary dark:bg-primaryDark text-tertiary dark:text-tertiary shadow-inner py-4 text-center">
        <p>© 2025 Inmobiliaria. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}