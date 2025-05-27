'use client'
import Link from 'next/link'
import { useState } from 'react'
import { TypewriterEffect } from './TypeWritterEffect'

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const [isConnecting, setIsConnecting] = useState(false)
    const [walletAddress, setWalletAddress] = useState<string | null>(null)

    const navItems = [
        { name: 'КУРСЫ', href: '/courses' },
        { name: 'О НАС', href: '/about' },
    ]

    const connectMetaMask = async () => {
        try {
            setIsConnecting(true)

            // ЗАглушка от gpt
            if (!window.ethereum) {
                throw new Error('MetaMask не установлен!')
            }

            // ЗАглушка от gpt
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            })

            setWalletAddress(accounts[0])
            setIsAuthModalOpen(false)
        } catch (error) {
            console.error('Ошибка подключения:', error)
            alert(error instanceof Error ? error.message : 'Неизвестная ошибка')
        } finally {
            setIsConnecting(false)
        }
    }

    return (
        <>
            <nav className="border-b border-hacker-pale bg-dark/80 backdrop-blur-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-primary hover:text-primary">
                                <TypewriterEffect
                                    text="PTEDTECH"
                                    speed={100}
                                    cursor={false}
                                    className="text-xl font-bold"
                                />
                            </Link>
                        </div>

                        {/* Десктопное меню */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-dark hover:text-primary transition-colors duration-200"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <button
                                    onClick={() => setIsAuthModalOpen(true)}
                                    className="ml-4 rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-black transition-colors duration-200"
                                >
                                    {walletAddress ? 'КОШЕЛЁК ПОДКЛЮЧЕН' : 'ВХОД'}
                                </button>
                            </div>
                        </div>

                        {/* Мобильное меню кнопка */}
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-dark hover:text-primary focus:outline-none"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Открыть меню</span>
                                {isMenuOpen ? (
                                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Мобильное меню */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-dark hover:text-primary"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false)
                                    setIsAuthModalOpen(true)
                                }}
                                className="mt-4 block w-full rounded-md border border-primary px-3 py-2 text-center text-base font-medium text-primary hover:bg-primary hover:text-black"
                            >
                                {walletAddress ? 'КОШЕЛЁК ПОДКЛЮЧЕН' : 'ВХОД'}
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {isAuthModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-lg border border-primary bg-dark p-6 shadow-lg">
                        <div className="mb-6 flex justify-between">
                            <h2 className="text-2xl font-bold text-primary">
                                <TypewriterEffect
                                    text="АВТОРИЗАЦИЯ"
                                    textColor="#FFF"
                                    speed={50}
                                    cursor={false}
                                />
                            </h2>
                            <button
                                onClick={() => setIsAuthModalOpen(false)}
                                className="text-white hover:text-primary"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="rounded-md border border-sky p-4">
                                <h3 className="mb-2 text-lg font-medium text-white">
                                    ВОЙТИ ЧЕРЕЗ CRYPTO WALLET
                                </h3>
                                <p className="mb-4 text-sm text-sky">
                                    Подключите свой кошелек для доступа к системе
                                </p>
                                <button
                                    onClick={connectMetaMask}
                                    disabled={isConnecting}
                                    className={`flex w-full items-center justify-center rounded-md px-4 py-3 text-white transition-colors ${isConnecting ? 'bg-dark' : 'bg-primary hover:bg-primary'}`}
                                >
                                    {isConnecting ? (
                                        <>
                                            <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            ПОДКЛЮЧЕНИЕ...
                                        </>
                                    ) : (
                                        <>
                                            <img
                                                src="/metamask-icon.svg"
                                                alt="MetaMask"
                                                className="mr-2 h-6 w-6"
                                            />
                                            META MASK
                                        </>
                                    )}
                                </button>
                            </div>

                            {walletAddress && (
                                <div className="mt-4 rounded-md bg-dark p-3 text-sm text-sky">
                                    <p>Подключенный адрес:</p>
                                    <p className="mt-1 truncate font-mono text-primary">
                                        {walletAddress}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}