import React from 'react'
import { RootStackScreenProps } from '@/navigation/types'

export type Props = RootStackScreenProps<'SignupStep2'>

export function useModel(P: Props) {
    const { navigation, route } = P
    const { email, marketingAgreement } = route.params

    const checkAuthCode = async (code: string) => {
        return { status: 'success' }
    }

    const sendAuthCodeEmail = async () => {
        return { status: 'success' }
    }

    const onSuccess = async () => navigation.navigate('SignupStep3', { email, marketingAgreement })

    const goBack = () => navigation.goBack()

    return {
        email,
        goBack,
        sendAuthCodeEmail,
        checkAuthCode,
        onSuccess
    }
}
