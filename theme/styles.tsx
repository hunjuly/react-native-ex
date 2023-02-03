import React from 'react'
import { TextStyle } from 'react-native'
import { useColors } from '@/theme'

export function useStepStyles() {
    const C = useColors()

    const styles = React.useMemo(
        () => ({
            container: {
                flex: 1,
                backgroundColor: C.elements6,
                alignItems: 'center'
            },
            headerBox: {
                justifyContent: 'center'
            },
            stepBox: {
                marginTop: 16,
                marginHorizontal: 22,
                height: 30
            },
            stepText: {
                color: C.shade1
            },
            stepBarBox: {
                marginTop: 8,
                marginHorizontal: 0,
                height: 4,
                flexDirection: 'row'
            },
            activeBar: {
                flex: 1,
                height: 4,
                marginHorizontal: 2,
                backgroundColor: C.shade1
            },
            deactiveBar: {
                flex: 1,
                height: 4,
                marginHorizontal: 2,
                backgroundColor: C.elements9
            }
        }),
        [C]
    )

    type Keys = keyof typeof styles
    return styles as { [key in Keys]: TextStyle }
}
