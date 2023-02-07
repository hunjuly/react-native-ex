import React from 'react'
import { Keyboard, TextInput, View } from 'react-native'
import { CompositeNavigationProp } from '@react-navigation/core'
import * as Clipboard from 'expo-clipboard'

export type Props = {
    navigation: CompositeNavigationProp<any, any>
    isError: boolean
    onChangeText: (text: string) => void
} & View['props']

export function useModel(P: Props) {
    const { onChangeText, navigation } = P

    const inputRef = React.useRef<TextInput | null>(null)

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            inputRef.current?.focus()
        })

        return unsubscribe
    }, [navigation])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            Keyboard.dismiss()
        })

        return unsubscribe
    }, [navigation])

    const [text, setText] = React.useState('')

    const checkText = (text: string) => {
        for (let i = 0; i < text.length; i++) {
            const digit = parseInt(text[i])

            if (isNaN(digit)) return
        }

        setText(text)
        onChangeText(text)
    }

    const paste = async () => {
        const text = await Clipboard.getStringAsync()

        checkText(text)
    }

    return {
        inputRef,
        text,
        checkText,
        paste
    }
}
