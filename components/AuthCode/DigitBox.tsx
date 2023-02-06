import React from 'react'
import { TextStyle, View } from 'react-native'
import { useColors } from '@/theme'
import { Text } from '../Text'

type Props = { text: String; index: number; isError: boolean }

export function DigitBox({ text, index, isError }: Props) {
    const C = useColors()

    const value = text[index]
    const isLast = text.length === index + 1

    const color = isLast ? C.primary : C.elements3
    const borderColor = isError ? C.accent : color

    const S = {
        digitBox: {
            width: 38,
            height: 44,
            borderBottomWidth: 2,
            borderColor,
            alignItems: 'center',
            marginHorizontal: 7
        } as TextStyle,
        title: {
            color: C.elements1
        }
    }

    return (
        <View style={S.digitBox}>
            <Text.H1 style={S.title} value={value} />
        </View>
    )
}
