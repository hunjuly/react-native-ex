import React from 'react'
import { StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { MainNavigatorProps } from '@/navigation/types'
import { Text } from '@/theme'

export default function Settings({ route }: MainNavigatorProps) {
    return (
        <View style={styles.container}>
            <StatusBar style={'dark'} />
            <Text.H1 style={styles.title}>{route.name} Settings Page.</Text.H1>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})
