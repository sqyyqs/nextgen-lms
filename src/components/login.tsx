"use client";

import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export default function Web3Auth() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { signMessage } = useSignMessage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nonce, setNonce] = useState('');

  useEffect(() => {
    fetch('/api/nonce')
      .then((res) => res.json())
      .then((data) => setNonce(data.nonce));
  }, []);

  const handleLogin = async () => {
    if (!isConnected) {
      await open();
    } else if (nonce) {
      const message = `Authenticate with nonce: ${nonce} for address: ${address}`;
      signMessage(
        { message },
        {
          onSuccess: async (signature) => {
            const response = await fetch('/api/auth', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ address, signature, message }),
            });
            if (response.ok) setIsAuthenticated(true);
          },
          onError: (error) => console.error('Signing failed:', error),
        }
      );
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Authenticated as {address}</p>
      ) : (
        <button onClick={handleLogin} disabled={!nonce}>
          {isConnected ? 'Sign Message' : 'Connect Wallet'}
        </button>
      )}
    </div>
  );
}