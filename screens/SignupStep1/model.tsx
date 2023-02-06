import React from 'react'
import { TextInput } from 'react-native'
import { isValidEmail } from '@/common'
import { RootStackScreenProps } from '@/navigation/types'

export type Props = RootStackScreenProps<'SignupStep1'>

export function useModel(P: Props) {
    const { navigation } = P

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
            navigation.navigate('SignupStep2', { email, marketingAgreement })
        } catch (error) {
            alert(error)
        }
    }

    const showPolicy = () => {
        alert('showPolicy')
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
