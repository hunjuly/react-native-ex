import React from 'react'
import { Animated, Easing, Keyboard, KeyboardEvent, Platform, View, useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native'
import { ToastContext } from '@/hooks'
import { Text, useColors } from '@/theme'

export function ToastView() {
    const C = useColors()
    const screen = useWindowDimensions()
    const [keyboardOffset, setKeyboardOffset] = React.useState({ duration: 0, y: screen.height })
    const [bottomHeight, setBottomHeight] = React.useState(0)
    const spaceHeight = React.useRef(new Animated.Value(0)).current

    const { message } = React.useContext(ToastContext)

    React.useEffect(() => {
        const callback = (event: KeyboardEvent) => {
            setKeyboardOffset({ duration: event.duration, y: event.endCoordinates.screenY })
        }

        /* keyboardWillShow/Hide는 android에서 동작하지 않음 */
        const showUnsubscribe = Keyboard.addListener('keyboardWillShow', callback)
        const hideUnsubscribe = Keyboard.addListener('keyboardWillHide', callback)

        return () => {
            showUnsubscribe?.remove()
            hideUnsubscribe?.remove()
        }
    }, [])

    React.useEffect(() => {
        const height = keyboardOffset.y - bottomHeight

        Animated.timing(spaceHeight, {
            toValue: height,
            duration: keyboardOffset.duration,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false
        }).start()
    }, [bottomHeight, keyboardOffset])

    return message ? (
        <Animated.View
            style={{
                position: 'absolute',
                width: '100%',
                bottom: Platform.OS === 'ios' ? undefined : 0,
                top: Platform.OS === 'ios' ? spaceHeight : undefined
            }}
        >
            <SafeAreaView onLayout={(event) => setBottomHeight(event.nativeEvent.layout.height)}>
                <View style={{ backgroundColor: C.shade1, height: 48, justifyContent: 'center' }}>
                    <Text.H1 style={{ color: C.elements4, marginLeft: 24 }} value={message} />
                </View>
            </SafeAreaView>
        </Animated.View>
    ) : (
        <View />
    )
}
