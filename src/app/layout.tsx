"use client"; // Добавляем директиву в начало файла

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import "@/styles/globals.css";

// Интерфейс для пропсов Web3Provider
interface Web3ProviderProps {
  children: ReactNode;
  projectId: string;
}

// Динамически импортируем Web3Provider с указанием типа
const Web3Provider = dynamic<Web3ProviderProps>(
  () => import('../components/Web3Provider').then((mod) => mod.Web3Provider),
  {
    ssr: false, // Теперь допустимо, так как это клиентский компонент
  }
);

export default function RootLayout({ children }: { children: ReactNode }) {
  const projectId = '2e0d530cbf6edd793e1166e4911cbdd8'; // Ваш projectId

  return (
    <html lang="en">
      <body>
        <Web3Provider projectId={projectId}>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}