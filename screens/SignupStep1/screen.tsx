import React from 'react'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import {
    Button,
    CheckBox,
    EmailField,
    KeyboardAnimateView,
    KeyboardAnimated,
    NavigationTitleBar,
    SafeAreaView,
    Text
} from '@/components'
import { useStepStyles } from '@/components/styles'
import { RootStackScreenProps } from '@/navigation/types'
import { Props, useModel } from './model'
import { useStyles, useTexts } from './resource'

export function SignupStep1(P: Props) {
    const M = useModel(P)
    const S = useStyles()
    const T = useTexts()
    const Step = useStepStyles()

    return (
        <View style={[Step.container]}>
            <StatusBar style={'dark'} />
            <SafeAreaView>
                <View style={Step.headerBox}>
                    <NavigationTitleBar onBackButton={M.goBack} title={T.title} />
                    <View style={Step.stepBox}>
                        <Text.Subtext style={Step.stepText} value={T.stepOf} />
                        <View style={Step.stepBarBox}>
                            <View style={Step.activeBar} />
                            <View style={Step.deactiveBar} />
                            <View style={Step.deactiveBar} />
                            <View style={Step.deactiveBar} />
                        </View>
                    </View>
                </View>

                <KeyboardAnimateView navigation={P.navigation} style={S.keyboardAnimateView}>
                    <Text.H1 style={S.title} value={T.subtitle} />
                    <Text.Body1 style={S.desc} value={T.desc} />
                    <EmailField
                        style={S.emailField}
                        forwardedRef={M.emailRef}
                        onChangeFocus={M.setEmailFocused}
                        currentText={M.email}
                        placeholder={T.placeholder}
                        invalid={M.emailAlerted}
                        enableCorrectMark={true}
                        onChange={M.onEmailChanged}
                    />
                    <Text.Caption style={S.invalidEmail} value={M.emailAlerted && T.invalidEmail} />
                    <CheckBox
                        onChange={M.setPolicyAgreement}
                        checked={M.policyAgreement}
                        text={T.policyAgreement(M.showPolicy)}
                        textStyle={S.agreementText}
                    />
                    <CheckBox
                        testID="marketingAgreement"
                        style={S.marketingAgreement}
                        onChange={M.setMarketingAgreement}
                        checked={M.marketingAgreement}
                        text={T.marketingAgreement}
                        textStyle={S.agreementText}
                    />
                    <KeyboardAnimated>
                        <Button.PrimaryL
                            title={T.continue}
                            style={S.continue}
                            onPress={M.doContinue}
                            disabled={!M.canContinue}
                        />
                    </KeyboardAnimated>
                </KeyboardAnimateView>
            </SafeAreaView>
        </View>
    )
}
