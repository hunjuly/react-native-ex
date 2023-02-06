import React from 'react'
import { TextStyle } from 'react-native'
import { useColors, useLocalization } from '@/theme'

export function useStyles() {
    const C = useColors()

    const styles = React.useMemo(
        () => ({
            keyboardAnimateView: {
                marginHorizontal: 22
            },
            title: {
                marginTop: 32,
                color: C.elements5
            },
            inputBox: {
                marginTop: 17,
                alignSelf: 'stretch'
            },
            password: {
                marginTop: 14
            },
            invalidPassword: {
                color: C.accent,
                textAlign: 'right'
            },
            conditionText: {
                color: C.elements2
            },
            continue: {
                marginHorizontal: 2,
                marginTop: 13,
                marginBottom: 26,
                height: 50,
                alignSelf: 'stretch'
            }
        }),
        [C]
    )

    type Keys = keyof typeof styles
    return styles as { [key in Keys]: TextStyle }
}

export const texts = {
    en: {
        title: 'Sign up',
        stepOf: 'STEP 3 OF 4',
        subtitle: 'Create a password',
        placeholder: 'Confirm Password',
        invalidPassword: 'Passwords do not match',
        continue: 'Continue',
        conditionText1: 'Minimum 8 characters',
        conditionText2: 'One uppercase & lowercase letter',
        conditionText3: 'One number',
        conditionText4: 'One special character'
    }
}

export function useTexts() {
    const localized = useLocalization(texts)

    return localized
}
