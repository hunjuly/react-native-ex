import React from 'react'
import { ImageBackground, ImageSourcePropType, View } from 'react-native'
import { StyleSheet, TextStyle, useWindowDimensions } from 'react-native'
import { SafeAreaBottom, SafeAreaTop } from '@/components'
import { Text } from '@/theme'
import { useColors, useLocalization } from '@/theme'

type OtherPageProps = {
    text: {
        title: string
        subtitle: string
        desc: string
    }
    image: ImageSourcePropType
}

export function OtherPage({ text, image }: OtherPageProps) {
    const S = useStyles()

    return (
        <View style={S.container}>
            <SafeAreaTop />
            <View style={S.top}>
                <Text.Body1 style={S.subtitle} value={text.subtitle} />
                <Text.Body2 style={S.title} value={text.title} />
            </View>
            <ImageBackground source={image} style={S.image} resizeMode="cover" />
            <View style={S.desc}>
                <Text.Body1 style={S.descText} value={text.desc} />
            </View>
            <SafeAreaBottom />
        </View>
    )
}

function useStyles() {
    const C = useColors()
    const screenWidth = useWindowDimensions().width

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: C.background2,
            width: screenWidth
        },
        top: {
            marginTop: 40,
            marginHorizontal: 24,
            backgroundColor: 'transparent'
        },
        subtitle: {
            fontFamily: 'OpenSans-SemiBold',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: 14,
            lineHeight: 19,
            letterSpacing: -0.4,
            color: C.primary
        },
        title: {
            color: C.elements1
        },
        image: {
            width: '100%',
            flex: 1,
            marginVertical: 12
        },
        desc: {
            height: 80,
            marginBottom: 152,
            justifyContent: 'center',
            backgroundColor: 'transparent'
        },
        descText: {
            textAlign: 'center',
            marginHorizontal: 8,
            color: C.elements2
        }
    })

    return styles
}
