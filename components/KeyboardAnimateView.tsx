import React from 'react'
import {
    Animated,
    Easing,
    EmitterSubscription,
    Keyboard,
    KeyboardEvent,
    Platform,
    ScrollView,
    View
} from 'react-native'
import { CompositeNavigationProp } from '@react-navigation/core'

type KeyboardScrollViewProps = {
    navigation: CompositeNavigationProp<any, any>
    keyboardDismissMode?: 'on-drag' | 'none'
} & View['props']

export function KeyboardAnimated(P: View['props']) {
    return <View {...P} />
}

export function KeyboardAnimateView({
    navigation,
    children,
    style,
    keyboardDismissMode
}: KeyboardScrollViewProps) {
    const viewRef = React.useRef<View>(null)

    const [scrollViewLayout, setScrollViewLayout] = React.useState({ height: 0, width: 0, x: 0, y: 0 })

    const [topHeight, setTopHeight] = React.useState(0)
    const [bottomHeight, setBottomHeight] = React.useState(0)

    const [keyboardOffset, setKeyboardOffset] = React.useState({ duration: 0, y: 0 })

    const spaceHeight = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        let showUnsubscribe: EmitterSubscription | undefined = undefined
        let hideUnsubscribe: EmitterSubscription | undefined = undefined

        const focusUnsubscribe = navigation.addListener('focus', () => {
            const callback = (event: KeyboardEvent) => {
                setKeyboardOffset({ duration: event.duration, y: event.endCoordinates.screenY })
            }

            /* keyboardWillShow/Hide는 android에서 동작하지 않음 */
            showUnsubscribe = Keyboard.addListener('keyboardWillShow', callback)
            hideUnsubscribe = Keyboard.addListener('keyboardWillHide', callback)
        })

        const blurUnsubscribe = navigation.addListener('blur', () => {
            showUnsubscribe?.remove()
            hideUnsubscribe?.remove()
        })

        return () => {
            focusUnsubscribe()
            blurUnsubscribe()
        }
    }, [navigation])

    React.useEffect(() => {
        let scrollViewHeight =
            Platform.OS === 'ios' ? keyboardOffset.y - scrollViewLayout.y : scrollViewLayout.height

        const keyboardNotViewOver = scrollViewLayout.y + scrollViewLayout.height < keyboardOffset.y
        const keyboardDisabled = keyboardOffset.y === 0

        if (keyboardNotViewOver || keyboardDisabled) {
            scrollViewHeight = scrollViewLayout.height
        }

        const margin = Math.max(scrollViewHeight - topHeight - bottomHeight, 0)

        Animated.timing(spaceHeight, {
            toValue: margin,
            duration: keyboardOffset.duration,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false
        }).start()
    }, [scrollViewLayout, topHeight, bottomHeight, keyboardOffset])

    let parts = children as JSX.Element[]

    const body = parts.slice(0, -1)
    const last = parts.slice(-1)

    if (last[0].type.name !== KeyboardAnimated.name) {
        console.error(`last child should be 'KeyboardAnimated'.(${last[0].key})`)
    }

    return (
        <View
            ref={viewRef}
            style={{ flex: 1 }}
            onLayout={(_event) => {
                if (viewRef) {
                    viewRef.current?.measure((x, y, width, height, _pageX, _pageY) => {
                        setScrollViewLayout({ x, y, width, height })
                    })
                }
            }}
        >
            <ScrollView
                keyboardDismissMode={keyboardDismissMode ? keyboardDismissMode : 'interactive'}
                keyboardShouldPersistTaps={keyboardDismissMode === 'none' ? 'always' : 'handled'}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={style}
            >
                <View onLayout={(event) => setTopHeight(Math.round(event.nativeEvent.layout.height))}>
                    {body}
                </View>
                <Animated.View style={{ marginTop: spaceHeight }}>
                    <View onLayout={(event) => setBottomHeight(Math.round(event.nativeEvent.layout.height))}>
                        {last}
                    </View>
                </Animated.View>
            </ScrollView>
        </View>
    )
}
