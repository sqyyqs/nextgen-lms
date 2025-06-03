'use client';
import React, { useEffect, useState } from "react";
import { loadContent } from "@/utils/content";
import { TypewriterEffect } from "@/components/TypeWritterEffect";
export default function HackerLabPage() {
    const [content, setContent] = useState<Record<string, any>>({});

    useEffect(() => {
        const fetchContent = async () => {
            const data = await loadContent();
            setContent(data);
        };
        fetchContent();
    }, []);

    if (!content.home) return (
        <div className="min-h-screen bg-black text-frost p-8 font-mono">
            <div className="animate-pulse">ЗАГРУЗКА СИСТЕМЫ...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white p-8 font-mono">
            <div className="max-w-3xl mx-auto">
                <div className="mb-12 border-b border-white pb-8">
                    <h1 className="text-4xl mb-4 uppercase tracking-wider text-red">
                        <TypewriterEffect
                            text={content.home.title}
                            textColor={'#FF0000'}
                            speed={150}
                            cursorStyle="_"
                        />
                    </h1>
                        <TypewriterEffect
                            text={content.home.subtitle}
                            speed={50}
                            delay={2000}
                            loop
                        />
                </div>

                <div className="mb-12 h-64 flex items-center justify-center border-2 border-dashed border-white rounded-lg">
                    <p className="text-white text-center">
                        Здесь будет Контент с описанием платформы))<br />
                        [ПРОСТРАНСТВО ЗАРЕЗЕРВИРОВАНО]
                    </p>
                </div>

                <div className="text-white text-sm border-t border-white pt-6">
                    <p>ВХОД В СИСТЕМУ ПОД КОНТРОЛЕМ 24/7</p>
                    <p className="mt-1">ВСЕ ДАННЫЕ ШИФРУЮТСЯ</p>
                </div>
            </div>
        </div>
    );
}