import React from 'react'

export function useToast() {
    const [message, setMessage] = React.useState<string | null>(null)

    const show = (newMessage: string) => {
        if (!message) {
            setMessage(newMessage)
            setTimeout(() => setMessage(null), 2000)
        }
    }

    return {
        message,
        show
    }
}

export type ToastContextType = {
    message: string | null
    show: (message: string) => void
}

export const ToastContext = React.createContext({} as ToastContextType)
