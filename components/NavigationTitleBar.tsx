import React from 'react'
import { View } from 'react-native'
import { Button, Text, useColors } from '@/theme'

type Props = {
    onBackButton?: () => void
    title: string
    right?: { title: string; onPress: () => void }
    type?: 'back' | 'close'
} & View['props']

const images = {
    back: require('@/assets/titlebar/back.png'),
    close: require('@/assets/titlebar/close.png')
}

export function NavigationTitleBar({ onBackButton, title, right, type }: Props) {
    const C = useColors()

    return (
        <View
            style={{
                justifyContent: 'center'
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    height: 44,
                    width: '100%',
                    alignItems: 'center'
                }}
            >
                <Text.H2
                    style={{
                        color: C.elements5,
                        textAlign: 'center',
                        flex: 1
                    }}
                    value={title}
                />
                <View
                    style={{
                        position: 'absolute',
                        flexDirection: 'row',
                        height: '100%',
                        width: '100%',
                        alignItems: 'center'
                    }}
                >
                    {onBackButton && (
                        <Button.Image
                            testID="goback"
                            style={{ marginLeft: 10 }}
                            onPress={onBackButton}
                            source={type ? images[type] : images.back}
                        />
                    )}
                    <View style={{ flex: 1 }} />
                    {right && (
                        <Button.TextS
                            style={{ marginRight: 23, color: C.primary }}
                            title={right.title}
                            onPress={right.onPress}
                        />
                    )}
                </View>
            </View>
        </View>
    )
}
