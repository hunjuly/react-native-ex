import React from 'react'
import { ImageBackground, View } from 'react-native'
import Logo from '@/assets/intro/Logo.svg'
import { SafeAreaTop } from '@/components'
import { Text } from '@/theme'
import { useStyles, useTexts } from './resource'

const background = require('@/assets/intro/Background.png')
const background2 = require('@/assets/intro/Background2.png')

export function FirstPage() {
    const S = useStyles()
    const T = useTexts()

    return (
        <View style={S.first.container}>
            <ImageBackground source={background} resizeMode="stretch" style={S.first.background} />
            <ImageBackground source={background2} resizeMode="contain" style={S.first.background} />
            <SafeAreaTop />
            <Text.H1 style={S.first.title} value={T.first.title} />
            <Logo style={S.first.logo} />
        </View>
    )
}
