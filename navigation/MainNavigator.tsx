/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { RootTabParams } from '@/navigation/types'
import Home from '@/screens/Home'
import Settings from '@/screens/Settings'
import { useColors } from '@/theme'

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParams>()

export default function MainNavigator() {
    const C = useColors()

    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarStyle: { backgroundColor: C.elements4 },
                tabBarActiveTintColor: C.primary
            }}
        >
            <BottomTab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <TabBarIcon name="home" focused={focused} />
                }}
            />
            <BottomTab.Screen
                name="Settings"
                component={Settings}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <TabBarIcon name="settings" focused={focused} />
                }}
            />
        </BottomTab.Navigator>
    )
}

const homeOn = require('@/assets/main/homeOn.png')
const homeOff = require('@/assets/main/homeOff.png')

const settingsOn = require('@/assets/main/settingsOn.png')
const settingsOff = require('@/assets/main/settingsOff.png')

const icons = {
    home: { on: homeOn, off: homeOff },
    settings: { on: settingsOn, off: settingsOff }
}

function TabBarIcon(P: { name: 'home' | 'settings'; focused: boolean }) {
    const { name, focused } = P
    const statuses = icons[name]
    const icon = statuses[focused ? 'on' : 'off']

    return <Image source={icon} style={{ width: 30, height: 30 }} />
}
