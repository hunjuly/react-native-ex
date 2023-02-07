import React from 'react'
import { ImageStyle } from 'react-native'
import { TextStyle } from 'react-native'
import { useColors, useLocalization } from '@/theme'

export function useStyles() {
    const C = useColors()

    const styles = React.useMemo(
        () => ({
            desc: {
                color: C.elements2,
                marginHorizontal: 22,
                marginTop: 16
            },
            bodyTitle: {
                color: C.elements5,
                marginHorizontal: 22,
                marginTop: 20
            },
            authCode: {
                marginTop: 44,
                marginBottom: 20
            },
            keyboardAnimated: {
                alignSelf: 'center',
                alignItems: 'center',
                marginBottom: 11,
                flexDirection: 'row'
            },
            receiveIt: { color: C.elements1 },
            resendEmail: { color: C.elements1 }
        }),
        [C]
    )

    type Keys = keyof typeof styles

    return styles as { [key in Keys]: TextStyle & ImageStyle }
}

export const texts = {
    en: {
        title: 'Reset Password',
        bodyTitle: 'Verify your email',
        desc: undefined,
        resendEmail: 'RESEND EMAIL',
        receiveIt: "Didn't receive it? ",
        mailResent: 'Mail has been resent.',
        noLonger: 'This account is no longer be used',
        cantResent: 'Mail can be resent after 5 minutes.'
    }
}

export function useTexts() {
    const localized = useLocalization(texts)

    const desc = useLocalization({
        en: (email: string) =>
            `Authentication code has been sent to [${email}].\nPlease enter the 6-digit authentication code within 10 minutes.`
    })

    return { ...localized, desc }
}
