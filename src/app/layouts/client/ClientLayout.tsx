import { useState, useEffect } from 'react';

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
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary dark:bg-primaryDark text-tertiary dark:text-tertiaryDark py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold">Inmobiliaria</h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="bg-secondary dark:bg-secondaryDark text-primary dark:text-primaryDark px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-primary dark:bg-primaryDark text-tertiary dark:text-tertiaryDark py-4 text-center">
        <p>&copy; 2025 Inmobiliaria. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}