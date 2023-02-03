import React from 'react'
import { ImageBackground, ImageSourcePropType, View } from 'react-native'
import { SafeAreaBottom, SafeAreaTop } from '@/components'
import { Text } from '@/theme'
import { useStyles } from './resource'

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
        <View style={S.other.container}>
            <SafeAreaTop />
            <View style={S.other.top}>
                <Text.Body1 style={S.other.subtitle} value={text.subtitle} />
                <Text.Body2 style={S.other.title} value={text.title} />
            </View>
            <ImageBackground source={image} style={S.other.image} resizeMode="cover" />
            <View style={S.other.desc}>
                <Text.Body1 style={S.other.descText} value={text.desc} />
            </View>
            <SafeAreaBottom />
        </View>
    )
}
