import React from 'react'
import { TextStyle } from 'react-native'
import { Callback } from '@/common'
import { Text } from '@/components'
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
            desc: {
                marginTop: 6,
                color: C.elements2
            },
            emailField: {
                marginTop: 17
            },
            invalidEmail: {
                color: C.accent,
                textAlign: 'right'
            },
            agreementText: {
                color: C.elements2
            },
            marketingAgreement: {
                marginTop: 17
            },
            policyLink: {
                color: C.shade2
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
        stepOf: 'STEP 1 OF 4',
        subtitle: 'What is your email address?',
        desc: 'You’ll use this email to log in.',
        placeholder: 'example_email@address.com',
        invalidEmail: 'Invalid email address',
        marketingAgreement: 'I would like to receive marketing information (optional).',
        continue: 'Continue',
        growPolicy: 'GROW Policy',
        policyAgreement: null
    }
}

export function useTexts() {
    const S = useStyles()

    const localized = useLocalization(texts)

    const makeLink = (onPress: Callback) => (
        <Text.Link style={S.policyLink} value={localized.growPolicy} onPress={onPress} />
    )

    const policyAgreement = useLocalization({
        en: (onPress: Callback) => (
            <>By submitting your email, you confirm you’ve read the {makeLink(onPress)}.</>
        )
    })

    return { ...localized, policyAgreement }
}
