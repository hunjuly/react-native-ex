import React from 'react'
import { View, ViewStyle } from 'react-native'
import { PageRange, RGB, medianColor, rgbToStr } from './PageRange'

type Props = {
    range: PageRange
    style: ViewStyle | undefined
}

export function PageIndicator({ range, style }: Props) {
    const elements = React.useMemo(() => {
        const elements = []

        for (let i = 0; i < range.total; i++) {
            const element = <View key={i} style={getStyle(i, range)} />

            elements.push(element)
        }

        return elements
    }, [range])

    return (
        <View
            style={[
                {
                    height: 9,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'transparent'
                },
                style
            ]}
        >
            {elements}
        </View>
    )
}

function getStyle(index: number, range: PageRange) {
    // tint1인데 중간변환 필요해서 하드코딩함
    const activeColor = { r: 9, g: 104, b: 237, a: 1 }
    const activeSize = 9

    const normalColor = { r: 78, g: 114, b: 165, a: 0.5 }
    const normalSize = 8

    const progress = range.progress ?? 0
    const isActive = range.current === index
    const isActiveToNormal = 0 < progress && isActive
    const isNormalToActive = 0 < progress && range.to === index

    if (isActiveToNormal) {
        const color = medianColor(activeColor, normalColor, progress)
        const dotSize = activeSize - 1 * progress

        return makeStyle(color, dotSize)
    } else if (isNormalToActive) {
        const color = medianColor(normalColor, activeColor, progress)
        const dotSize = normalSize + 1 * progress

        return makeStyle(color, dotSize)
    } else if (isActive) {
        return makeStyle(activeColor, activeSize)
    } else {
        return makeStyle(normalColor, normalSize)
    }
}

function makeStyle(color: RGB, dotSize: number): ViewStyle {
    return {
        width: dotSize,
        height: dotSize,
        borderRadius: dotSize / 2,
        backgroundColor: rgbToStr(color),
        marginHorizontal: 5
    }
}
