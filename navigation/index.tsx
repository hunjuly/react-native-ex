/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Main from '@/screens/Main'
import LinkingConfiguration from './LinkingConfiguration'
import MainNavigator from './MainNavigator'
import { RootStackParams } from './types'

export default function Navigation() {
    return (
        <NavigationContainer linking={LinkingConfiguration}>
            <Screens />
            {/* <ToastView /> */}
        </NavigationContainer>
    )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParams>()

function Screens() {
    return (
        <Stack.Navigator initialRouteName={'Main'}>
            <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="MainNavigator" component={MainNavigator} />
                <Stack.Group screenOptions={{ presentation: 'transparentModal', animation: 'fade' }}>
                    {/* <Stack.Screen name="AccountLocked" component={AccountLocked} /> */}
                </Stack.Group>
            </Stack.Group>
        </Stack.Navigator>
    )
}
