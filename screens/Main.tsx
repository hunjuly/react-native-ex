import React from 'react'
import { AppState } from 'react-native'
import { View } from 'react-native'
// import { RequestContext } from '@/hooks'
import { RootStackScreenProps } from '@/navigation/types'

export default function Main({ navigation }: RootStackScreenProps<'Main'>) {
    const appState = React.useRef(AppState.currentState)
    // const request = React.useContext(RequestContext)

    React.useEffect(() => {
        console.log('App Started.')
    }, [])

    React.useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            // 원래 코드는 "/inactive|background/"
            // inactive는 알림창을 보는 등 잠시 비활성화 되는 상태이며 ios에만 있어서 제거함
            if (appState.current.match(/background/) && nextAppState === 'active') {
            }

            appState.current = nextAppState
        })

        return () => {
            subscription.remove()
        }
    }, [])

    React.useEffect(() => {
        // if (request.isLoggedIn) {
        navigation.navigate('MainNavigator', { screen: 'Home' })

        //     if (handshake.referralCodeRequired) {
        //         navigation.navigate('SignupStep4')
        //     }
        // } else {
        //     navigation.navigate('Intro')
        // }
    }, [])

    return <View style={{ flex: 1 }}></View>
}
