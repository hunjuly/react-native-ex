import React from 'react'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import {
    Button,
    KeyboardAnimateView,
    KeyboardAnimated,
    NavigationTitleBar,
    PasswordField,
    SafeAreaView,
    StatusChip,
    StatusChipValueType,
    Text
} from '@/components'
import { useStepStyles } from '@/components/styles'
import { Props, useModel } from './model'
import { useStyles, useTexts } from './resource'

export function SignupStep3(P: Props) {
    const M = useModel(P)
    const S = useStyles()
    const T = useTexts()
    const Step = useStepStyles()

    // StatusChip에 종속되는 값을 계산하는 함수다.
    // 모델과 관련이 없으며 StatusChip 컨트롤에 종속되는 함수이기 때문에 Screen에 둔다.
    const chipStatus = (satisfied: boolean): StatusChipValueType => {
        if (0 === M.password1.length) {
            return 'disable'
        }

        return satisfied ? 'ok' : 'error'
    }

    const onSubmitEditing = () => M.password2Ref.current?.focus()

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
                            <View style={Step.activeBar} />
                            <View style={Step.activeBar} />
                            <View style={Step.deactiveBar} />
                        </View>
                    </View>
                </View>
                <KeyboardAnimateView navigation={P.navigation} style={S.keyboardAnimateView}>
                    <Text.H1 style={S.title} value={T.subtitle} />
                    <View style={S.inputBox}>
                        <PasswordField
                            testID="password1"
                            forwardedRef={M.password1Ref}
                            style={S.password}
                            currentText={M.password1}
                            onSubmitEditing={onSubmitEditing}
                            onChange={M.onPassword1Changed}
                        />
                        <PasswordField
                            placeholder={T.placeholder}
                            forwardedRef={M.password2Ref}
                            style={S.password}
                            currentText={M.password2}
                            invalid={M.invalidPassword}
                            onChange={M.onPassword2Changed}
                        />
                        <Text.Caption
                            style={S.invalidPassword}
                            value={M.invalidPassword && T.invalidPassword}
                        />
                    </View>
                    <View>
                        <StatusChip status={chipStatus(M.satisfied.rule1)}>
                            <Text.Body2 style={S.conditionText} value={T.conditionText1} />
                        </StatusChip>
                        <StatusChip status={chipStatus(M.satisfied.rule2)}>
                            <Text.Body2 style={S.conditionText} value={T.conditionText2} />
                        </StatusChip>
                        <StatusChip status={chipStatus(M.satisfied.rule3)}>
                            <Text.Body2 style={S.conditionText} value={T.conditionText3} />
                        </StatusChip>
                        <StatusChip status={chipStatus(M.satisfied.rule4)}>
                            <Text.Body2 style={S.conditionText} value={T.conditionText4} />
                        </StatusChip>
                    </View>
                    <KeyboardAnimated>
                        <Button.PrimaryL
                            style={S.continue}
                            onPress={M.doContinue}
                            disabled={!M.canContinue}
                            title={T.continue}
                        />
                    </KeyboardAnimated>
                </KeyboardAnimateView>
            </SafeAreaView>
        </View>
    )
}
