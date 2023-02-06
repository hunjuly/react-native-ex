import React from 'react'
import { useRequestSignup, useVerifySignup } from '@/apis'
import { RequestContext } from '@/hooks'
import { RootStackScreenProps } from '@/navigation/types'

export type Props = RootStackScreenProps<'SignupStep2'>

export function useModel(P: Props) {
    const { navigation, route } = P
    const { email, authId, marketingAgreement } = route.params

    const request = React.useContext(RequestContext)
    const verifySignup = useVerifySignup(request)
    const requestSignup = useRequestSignup(request)

    const checkAuthCode = async (code: string) => verifySignup(email, code, authId)

    const sendAuthCodeEmail = async () => requestSignup(email)

    const onSuccess = async () => navigation.navigate('SignupStep3', { email, authId, marketingAgreement })

    const goBack = () => navigation.goBack()

    return {
        email,
        goBack,
        sendAuthCodeEmail,
        checkAuthCode,
        onSuccess
    }
}
