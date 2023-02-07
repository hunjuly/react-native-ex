import React from 'react'
import { ImageStyle } from 'react-native'
import { TextStyle } from 'react-native'
import { ViewStyle } from 'react-native'
import { useColors, useLocalization } from '@/theme'

export function useStyles() {
    const C = useColors()

    const styles = React.useMemo(
        () => ({
            container: {
                // flex: 1,
                // backgroundColor: C.elements3,
                // borderWidth: 4
            },
            scrollview: {
                // backgroundColor: C.elements1,
                // borderWidth: 2
            } as ViewStyle
        }),
        [C]
    )

    type Keys = keyof typeof styles

    return styles as { [key in Keys]: TextStyle & ImageStyle }
}

export function useTexts() {
    const texts = {
        en: {
            hello: 'Hello',
            banner: 'Get GROW Referral Rewards!'
        }
    }

    const localized = useLocalization(texts)

    return { ...localized }
}
