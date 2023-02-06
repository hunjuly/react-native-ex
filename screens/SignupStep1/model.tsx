import React from 'react'
import { TextInput } from 'react-native'
import { useRequestSignup } from '@/apis'
import { isValidEmail } from '@/common'
import { RequestContext } from '@/hooks'
import { PopupContext } from '@/hooks'
import { RootStackScreenProps } from '@/navigation/types'

export type Props = RootStackScreenProps<'SignupStep1'>

export function useModel(P: Props) {
    const { navigation } = P

    const popup = React.useContext(PopupContext)
    const request = React.useContext(RequestContext)
    const requestSignup = useRequestSignup(request)

    const [email, setEmail] = React.useState(__DEV__ ? 'user@test.com' : '')
    const [marketingAgreement, setMarketingAgreement] = React.useState(false)

    // states
    const emailRef = React.createRef<TextInput>()

    const [policyAgreement, setPolicyAgreement] = React.useState(false)
    const [emailDenied, setEmailDenied] = React.useState(false)
    const [emailFocused, setEmailFocused] = React.useState(false)

    const emailAlerted = !isValidEmail(email) && !emailFocused
    const canContinue = policyAgreement && isValidEmail(email) && !emailDenied

    // callbacks
    const doContinue = async () => {
        try {
            const response = await requestSignup(email)

            const success = response.status === 'success' || response.status === 'resend-limit'

            if (success) {
                const authId = response.authId ?? 0

                navigation.navigate('SignupStep2', { email, authId, marketingAgreement })
            } else {
                setEmailDenied(true)

                switch (response.status) {
                    case 'already-exists':
                        popup.setOptions({
                            yes: () => navigation.navigate('LoginEmail')
                        })
                        navigation.navigate('AlreadyRegistered')
                        break
                    case 'unable-register':
                        navigation.navigate('UnableRegister')
                        break
                    default:
                        Log.error(`'${response}' not processed`)
                }
            }
        } catch (error) {
            alert(error)
        }
    }

    const showPolicy = () => {
        popup.setOptions({
            yes: () => setPolicyAgreement(true)
        })
        navigation.navigate('AgreePolicy')
    }

    const onEmailChanged = (text: string) => {
        setEmailDenied(false)
        setEmail(text)
    }

    // Login -> Signup의 경우도 있어서 navigation.goBack()을 하지 않음
    const goBack = () => {
        navigation.navigate('Intro')
    }

    React.useEffect(() => {
        emailRef.current?.focus()
    }, [])

    return {
        email,
        setMarketingAgreement,
        marketingAgreement,
        emailAlerted,
        canContinue,
        doContinue,
        showPolicy,
        onEmailChanged,
        setEmailFocused,
        setPolicyAgreement,
        policyAgreement,
        emailRef,
        goBack
    }
}
