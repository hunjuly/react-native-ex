import React from 'react'
import { Animated, Easing, TouchableWithoutFeedback } from 'react-native'
import { animationDuration } from '@/config'
import { useColors } from '@/theme'

type SwitchProps = { value: boolean; onPress: () => void }
export function Switch({ value: activate, onPress }: SwitchProps) {
    const C = useColors()

    const position = React.useRef(new Animated.Value(activate ? 22 : 2)).current

    React.useEffect(() => {
        const toValue = activate ? 22 : 2

        Animated.timing(position, {
            toValue,
            duration: animationDuration,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false
        }).start()
    }, [activate])

    const animation = React.useRef(new Animated.Value(activate ? 0 : 1)).current

    const boxInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(0,74,177,1)', 'rgba(120,120,128,0.16)']
    })

    React.useEffect(() => {
        const toValue = activate ? 0 : 1

        Animated.timing(animation, {
            toValue,
            duration: animationDuration,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false
        }).start()
    }, [activate])

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Animated.View
                style={{
                    width: 51,
                    height: 31,
                    borderRadius: 16,
                    backgroundColor: boxInterpolation
                }}
            >
                <Animated.View
                    style={{
                        top: 2,
                        left: position,
                        width: 27,
                        height: 27,
                        backgroundColor: C.elements6,
                        borderRadius: 14,
                        shadowColor: 'rgb(0,0,0)',
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: 0.15,
                        shadowRadius: 1
                    }}
                ></Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}
