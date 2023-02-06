import React from 'react'
import { TextInput } from 'react-native'
import { RequestContext } from '@/hooks'
import { RootStackScreenProps } from '@/navigation/types'

export type Props = RootStackScreenProps<'SignupStep3'>

export function useModel(P: Props) {
    const { navigation, route } = P
    const { email, marketingAgreement } = route.params

    const request = React.useContext(RequestContext)

    const [password1, setPassword1] = React.useState(__DEV__ ? 'aA0000!1' : '')
    const password1Ref = React.createRef<TextInput>()

    const [password2, setPassword2] = React.useState(__DEV__ ? 'aA0000!1' : '')
    const password2Ref = React.createRef<TextInput>()

    const [satisfied, setSatisfied] = React.useState({
        all: __DEV__,
        rule1: __DEV__,
        rule2: __DEV__,
        rule3: __DEV__,
        rule4: __DEV__
    })

    const canContinue = React.useMemo(() => {
        return password1 === password2 && satisfied.all
    }, [password1, password2, satisfied])

    const invalidPassword = password1 !== password2 && 0 < password2.length

    const onPassword1Changed = (text: string) => {
        setPassword1(text)

        const satisfied = checkPasswordRules(text)
        setSatisfied(satisfied)
    }

    const onPassword2Changed = (text: string) => {
        setPassword2(text)
    }

    const doContinue = async () => {
        try {
            if (password1 === password2) {
                navigation.navigate('MainNavigator')
            }
        } catch (error) {
            alert(error)
        }
    }

    const goBack = () => navigation.goBack()

    return {
        password1,
        password2,
        password1Ref,
        password2Ref,
        canContinue,
        satisfied,
        doContinue,
        onPassword1Changed,
        onPassword2Changed,
        invalidPassword,
        goBack
    }
}

function checkPasswordRules(password: string) {
    //Minimum 8 characters
    const rule1 = /^(?=.*).{8,}$/.test(password)
    //One uppercase & lowercase letter
    const rule2 = /^(?=.*[a-z])(?=.*[A-Z]).{0,}$/.test(password)
    //One number
    const rule3 = /^(?=.*\d).{0,}$/.test(password)
    //One special character
    const rule4 = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{0,}$/.test(password)

    return {
        all: rule1 && rule2 && rule3 && rule4,
        rule1,
        rule2,
        rule3,
        rule4
    }
}
