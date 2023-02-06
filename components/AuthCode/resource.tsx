import React from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { useColors, useLocalization } from '@/theme'

export function useStyles(style: StyleProp<ViewStyle>) {
    const C = useColors()

    const styles = React.useMemo(
        () => ({
            container: [
                {
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: 314
                },
                style
            ],
            digits: {
                marginVertical: 8,
                flexDirection: 'row'
            },
            caption: {
                alignSelf: 'flex-end',
                textAlign: 'right',
                color: C.accent,
                marginRight: 7,
                height: 14
            },
            textInput: {
                position: 'absolute',
                width: '100%',
                height: '100%',
                color: 'transparent'
            },
            paste: {
                marginTop: 14
            }
        }),
        [C]
    )

    type Keys = keyof typeof styles
    return styles as { [key in Keys]: TextStyle }
}

export function useTexts() {
    const texts = {
        en: {
            caption: 'Authentication code has expired or is invalid'
        }
    }

    return useLocalization(texts)
}
