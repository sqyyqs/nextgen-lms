'use client'
import { useEffect, useState } from 'react'

interface TypewriterProps {
    text: string | string[]
    speed?: number
    delay?: number
    loop?: boolean
    cursor?: boolean
    cursorStyle?: string
    className?: string
    textColor?: string
    cursorColor?: string
    onComplete?: () => void
}

export const TypewriterEffect = ({
                                     text,
                                     speed = 100,
                                     delay = 1000,
                                     loop = false,
                                     cursor = true,
                                     cursorStyle = '|',
                                     className = '',
                                     textColor = 'inherit',
                                     cursorColor = 'inherit',
                                     onComplete,
                                 }: TypewriterProps) => {
    const [displayText, setDisplayText] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const [currentTextIndex, setCurrentTextIndex] = useState(0)
    const texts = Array.isArray(text) ? text : [text]
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        if (!isComplete) return

        onComplete?.()
        setIsComplete(false)
    }, [isComplete, onComplete])

    useEffect(() => {
        const timeout = setTimeout(() => {
            const currentText = texts[currentTextIndex]

            if (isDeleting) {
                // Удаление текста
                setDisplayText(currentText.substring(0, displayText.length - 1))
                setCurrentIndex(currentIndex - 1)

                if (displayText === '') {
                    setIsDeleting(false)
                    const nextIndex = (currentTextIndex + 1) % texts.length
                    setCurrentTextIndex(nextIndex)

                    // Если не зациклено и это последний текст
                    if (!loop && nextIndex === 0) {
                        setIsComplete(true)
                    }
                }
            } else {
                // Печать текста
                setDisplayText(currentText.substring(0, currentIndex + 1))
                setCurrentIndex(currentIndex + 1)

                if (displayText === currentText) {
                    if (loop || currentTextIndex < texts.length - 1) {
                        setTimeout(() => setIsDeleting(true), delay)
                    } else {
                        setIsComplete(true)
                    }
                }
            }
        }, isDeleting ? speed / 2 : speed)

        return () => clearTimeout(timeout)
    }, [currentIndex, isDeleting, currentTextIndex, displayText])

    return (
        <div className={`inline-flex items-center ${className}`}>
            <span style={{ color: textColor }}>{displayText}</span>
            {cursor && (
                <span
                    className="animate-blink ml-1"
                    style={{ color: cursorColor }}
                >
          {cursorStyle}
        </span>
            )}
        </div>
    )
}