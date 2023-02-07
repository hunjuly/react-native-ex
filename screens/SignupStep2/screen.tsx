import React from 'react'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { NavigationTitleBar, SafeAreaView } from '@/components'
import { Text, useStepStyles } from '@/theme'
import { VerifyEmailCode } from '@/views'
import { Props, useModel } from './model'
import { useTexts } from './resource'

export function SignupStep2(P: Props) {
    const M = useModel(P)
    const T = useTexts()
    const Step = useStepStyles()

    return (
        <View style={[Step.container]}>
            <StatusBar style={'dark'} />
            <SafeAreaView>
                <View style={Step.headerBox}>
                    <NavigationTitleBar onBackButton={M.goBack} title={T.title} />
                    <View style={Step.stepBox}>
                        <Text.Body1 style={Step.stepText} value={T.stepOf} />
                        <View style={Step.stepBarBox}>
                            <View style={Step.activeBar} />
                            <View style={Step.activeBar} />
                            <View style={Step.deactiveBar} />
                            <View style={Step.deactiveBar} />
                        </View>
                    </View>
                </View>
                <VerifyEmailCode
                    email={M.email}
                    sendAuthCodeEmail={M.sendAuthCodeEmail}
                    checkAuthCode={M.checkAuthCode}
                    onSuccess={M.onSuccess}
                    navigation={P.navigation}
                />
            </SafeAreaView>
        </View>
    )
}
