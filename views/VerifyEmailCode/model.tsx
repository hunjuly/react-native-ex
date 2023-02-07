import React from 'react'
import { CompositeNavigationProp } from '@react-navigation/native'
import { ToastContext } from '@/hooks'
import { useTexts } from './resource'

export type Props = {
    email: string
    sendAuthCodeEmail: () => Promise<{ status: string }>
    checkAuthCode: (text: string) => Promise<{ status: string }>
    navigation: CompositeNavigationProp<any, any>
    onSuccess: () => Promise<void>
}

export function useModel(P: Props) {
    const T = useTexts()

    const toast = React.useContext(ToastContext)

    const [isError, setIsError] = React.useState(false)

    const onAuthCodeChanged = async (code: string) => {
        try {
            setIsError(false)

            if (code.length === 6) {
                const response = await P.checkAuthCode(code)

                if (response.status === 'success') {
                    P.onSuccess()
                } else {
                    setIsError(true)
                }
            }
        } catch (error) {
            alert(error)
        }

        setIsError(false)
    }

    const resendEmail = async () => {
        try {
            const response = await P.sendAuthCodeEmail()

            if (response.status === 'success') {
                toast.show(T.mailResent)
            } else if (response.status === 'resend-limit') {
                toast.show(T.cantResent)
            } else if (response.status === 'no-longer') {
                toast.show(T.noLonger)
            } else {
                alert(response.status)
            }
        } catch (error) {
            alert(error)
        }
    }

    return {
        email: P.email,
        isError,
        onAuthCodeChanged,
        resendEmail
    }
}
