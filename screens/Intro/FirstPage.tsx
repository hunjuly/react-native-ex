import React from 'react'
import { ImageBackground, View } from 'react-native'
import { StyleSheet, useWindowDimensions } from 'react-native'
import Logo from '@/assets/intro/Logo.svg'
import { SafeAreaTop } from '@/components'
import { Text } from '@/theme'
import { useColors } from '@/theme'
import { useTexts } from './resource'

const background = require('@/assets/intro/Background.png')
const background2 = require('@/assets/intro/Background2.png')

export function FirstPage() {
    const S = useStyles()
    const T = useTexts()

    return (
        <View style={S.container}>
            <ImageBackground source={background} resizeMode="stretch" style={S.background} />
            <ImageBackground source={background2} resizeMode="contain" style={S.background} />
            <SafeAreaTop />
            <Text.H1 style={S.title} value={T.first.title} />
            <Logo style={S.logo} />
        </View>
    )
}

function useStyles() {
    const C = useColors()
    const screenWidth = useWindowDimensions().width

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            width: screenWidth
        },
        background: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        },
        title: {
            marginHorizontal: 24,
            marginTop: 40,
            color: C.elements6
        },
        logo: {
            marginTop: 95
        }
    })

    return styles
}
