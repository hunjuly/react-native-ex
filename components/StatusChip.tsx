import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'

const disableImage = require('@/assets/chip/disable.png')
const okImage = require('@/assets/chip/ok.png')
const errorImage = require('@/assets/chip/error.png')

export type StatusChipValueType = 'disable' | 'error' | 'ok'

type StatusChipProps = {
    status: StatusChipValueType
    onPress?: () => void
} & View['props']

export function StatusChip({ status, style, children, onPress }: StatusChipProps) {
    let image: any

    if (status === 'disable') {
        image = disableImage
    } else if (status === 'error') {
        image = errorImage
    } else if (status === 'ok') {
        image = okImage
    }

    return (
        <View style={[{ flexDirection: 'row' }, style]}>
            <TouchableOpacity onPress={onPress} disabled={!onPress}>
                <Image source={image} style={{ marginHorizontal: 6, marginTop: 1 }} />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>{children}</View>
        </View>
    )
}
