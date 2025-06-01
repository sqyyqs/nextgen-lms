'use client';

import {useState} from 'react';
import {ethers} from 'ethers';

export default function HomePage() {
    const [walletAddress, setWalletAddress] = useState('');
    const [isConnected, setIsConnected] = useState(false);

    const connectWallet = async () => {
        if (!window.ethereum) {
            alert('MetaMask не установлен');
            return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        const address = accounts[0];
        setWalletAddress(address);

        const nonceRes = await fetch('/api/nonce');
        const {message} = await nonceRes.json();

        const signer = await provider.getSigner();
        const signature = await signer.signMessage(message);

        const authRes = await fetch('/api/auth', {
            method: 'POST',
            body: JSON.stringify({address, signature, message}),
        });

        const data = await authRes.json();
        if (data.success) {
            setIsConnected(true);
        } else {
            alert('Ошибка авторизации');
        }
    };

    return (
        <main className="p-8">
            {isConnected ? (
                <div>✅ Подключено: {walletAddress}</div>
            ) : (
                <button
                    onClick={connectWallet}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Подключить MetaMask
                </button>
            )}
        </main>
    );
}
