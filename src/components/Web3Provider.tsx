"use client";

import { createWeb3Modal } from '@web3modal/wagmi/react';
import { createConfig, WagmiConfig } from 'wagmi';
import { mainnet, sepolia, Chain } from 'wagmi/chains';
import { http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient();
let wagmiConfigInstance: ReturnType<typeof createConfig>;

function initializeWeb3Modal(projectId: string) {
  const chains: readonly [Chain, ...Chain[]] = [mainnet, sepolia];
  const transports: Record<number, ReturnType<typeof http>> = {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  };

  wagmiConfigInstance = createConfig({
    chains,
    transports,
  });

  console.log('Calling createWeb3Modal with projectId:', projectId); // Логируем вызов
  createWeb3Modal({
    wagmiConfig: wagmiConfigInstance,
    projectId,
  });
}

export function Web3Provider({ children, projectId }: { children: React.ReactNode; projectId: string }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized && projectId) {
      initializeWeb3Modal(projectId);
      setIsInitialized(true);
    }
  }, [projectId, isInitialized]);

  if (!isInitialized) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfigInstance}>
        {children}
      </WagmiConfig>
    </QueryClientProvider>
  );
}