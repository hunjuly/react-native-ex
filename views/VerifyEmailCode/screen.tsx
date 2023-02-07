import React from 'react'
import { KeyboardAnimateView, KeyboardAnimated } from '@/components'
import { Button, Text } from '@/theme'
import { AuthCode } from '../AuthCode'
import { Props, useModel } from './model'
import { useStyles, useTexts } from './resource'

export function VerifyEmailCode(P: Props) {
    const M = useModel(P)
    const S = useStyles()
    const T = useTexts()

    return (
        <KeyboardAnimateView navigation={P.navigation}>
            <Text.H1 style={S.bodyTitle} value={T.bodyTitle} />
            <Text.Body1 style={S.desc} value={T.desc(M.email)} />
            <AuthCode
                testID="authCode"
                navigation={P.navigation}
                style={S.authCode}
                onChangeText={M.onAuthCodeChanged}
                isError={M.isError}
            />
            <KeyboardAnimated style={S.keyboardAnimated}>
                <Text.Body2 style={S.receiveIt} value={T.receiveIt} />
                <Button.TextS style={S.resendEmail} title={T.resendEmail} onPress={M.resendEmail} />
            </KeyboardAnimated>
        </KeyboardAnimateView>
    )
}
