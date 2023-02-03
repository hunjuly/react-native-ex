import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import MaskedView from '@react-native-community/masked-view'
import { PageRange } from '@/components'
import { Text, useColors } from '@/theme'
import { useTexts } from './resource'

type Props = {
    range: PageRange
    onPress: () => void
}

export function LookAround({ range, onPress }: Props) {
    const C = useColors()
    const T = useTexts()

    const pageColors = [C.elements6, C.elements1, C.elements1, C.elements1]

    const progress = range.progress ?? 0

    const leftColor = pageColors[range.current]
    let leftStyle = { flex: 1 - progress, backgroundColor: leftColor }

    const rightColor = pageColors[range.to ?? range.current]
    let rightStyle = { flex: progress, backgroundColor: rightColor }

    const isRightDirection = () => {
        const last = pageColors.length - 1

        // 이동하지 않는 상태
        if (range.to === undefined) return true

        // 오른쪽 한 칸 이동
        if (range.to - range.current === 1) return true

        // 마지막에서 처음으로 이동
        if (range.current === last && range.to === 0) return true

        return false
    }

    if (!isRightDirection()) {
        const temp = leftStyle
        leftStyle = rightStyle
        rightStyle = temp
    }

    return (
        <TouchableOpacity style={{ height: 30, width: 100 }} onPress={onPress}>
            <MaskedView
                style={{ flexDirection: 'row' }}
                maskElement={
                    <View
                        style={{
                            backgroundColor: 'transparent',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text.ButtonS value={T.lookAround} />
                    </View>
                }
            >
                <View style={{ ...leftStyle, height: 30 }} />
                <View style={{ ...rightStyle, height: 30 }} />
            </MaskedView>
        </TouchableOpacity>
    )
}
