'use client'
import Link from 'next/link'
import { useState } from 'react'
import { TypewriterEffect } from './TypeWritterEffect'

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navItems = [
        { name: 'КУРСЫ', href: '/courses' },
        { name: 'О НАС', href: '/about' },
    ]

    return (
        <nav className="border-b border-hacker-pale bg-dark/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-primary hover:text-primary-dark">
                            <TypewriterEffect
                                text="PTEDTECH_"
                                speed={100}
                                cursor={false}
                                className="text-xl font-bold"
                            />
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="rounded-md px-3 py-2 text-sm font-medium text-white-light hover:bg-dark-light hover:text-primary transition-colors duration-200"
                                >
                                    <TypewriterEffect
                                        text={item.name}
                                        speed={30}
                                        cursor={false}
                                    />
                                </Link>
                            ))}
                            <button className="ml-4 rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-black transition-colors duration-200">
                                ВХОД
                            </button>
                        </div>
                    </div>

                    {/* Мобильное меню кнопка */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-white-light hover:bg-dark-light hover:text-primary focus:outline-none"
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
                                className="block rounded-md px-3 py-2 text-base font-medium text-white-light hover:bg-dark-light hover:text-primary"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <button className="mt-4 block w-full rounded-md border border-primary px-3 py-2 text-center text-base font-medium text-primary hover:bg-primary hover:text-black">
                            ВХОД
                        </button>
                    </div>
                </div>
            )}
        </nav>
    )
}