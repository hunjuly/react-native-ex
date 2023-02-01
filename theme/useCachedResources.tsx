import { FontAwesome } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

export function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = useState(false)

    // Load any resources or data that we need prior to rendering the app
    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHideAsync()

                await Font.loadAsync({
                    ...FontAwesome.font,
                    'OpenSans-Bold': require('./fonts/OpenSans-Bold.ttf')
                })
                await Font.loadAsync({
                    ...FontAwesome.font,
                    'OpenSans-SemiBold': require('./fonts/OpenSans-SemiBold.ttf')
                })
                await Font.loadAsync({
                    ...FontAwesome.font,
                    'OpenSans-Light': require('./fonts/OpenSans-Light.ttf')
                })
                await Font.loadAsync({
                    ...FontAwesome.font,
                    'Roboto-Bold': require('./fonts/Roboto-Bold.ttf')
                })
                await Font.loadAsync({
                    ...FontAwesome.font,
                    'Roboto-Regular': require('./fonts/Roboto-Regular.ttf')
                })
                await Font.loadAsync({
                    ...FontAwesome.font,
                    'Roboto-Medium': require('./fonts/Roboto-Medium.ttf')
                })
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e)
            } finally {
                setLoadingComplete(true)
                SplashScreen.hideAsync()
            }
        }

        loadResourcesAndDataAsync()
    }, [])

    return isLoadingComplete
}
