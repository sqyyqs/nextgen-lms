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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/nonce')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Nonce response:', data);
        if (data.nonce) setNonce(data.nonce);
        else setError('Nonce not found in response');
      })
      .catch((err) => {
        console.error('Failed to fetch nonce:', err);
        setError('Failed to fetch nonce');
      });
  }, []);

  const handleLogin = async () => {
    console.log('handleLogin called'); // Логируем вызов функции
    console.log('isConnected:', isConnected);
    console.log('nonce:', nonce);

    if (!isConnected) {
      console.log('Opening Web3Modal...');
      try {
        await open();
        console.log('Web3Modal opened successfully');
      } catch (err) {
        console.error('Failed to open Web3Modal:', err);
        setError('Failed to open Web3Modal');
      }
    } else if (nonce) {
      console.log('Signing message...');
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
          onError: (error) => {
            console.error('Signing failed:', error);
            setError('Signing failed');
          },
        }
      );
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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