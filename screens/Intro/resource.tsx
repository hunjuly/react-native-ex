import React from 'react'
import { StyleSheet } from 'react-native'
import { useColors, useLocalization } from '@/theme'

export function useStyles() {
    const C = useColors()

    const styles = StyleSheet.create({
        container: {
            justifyContent: 'flex-end'
        },
        buttonContainer: {
            backgroundColor: 'transparent',
            flexDirection: 'row',
            marginTop: 4,
            marginBottom: 24,
            paddingHorizontal: 21
        },
        button: {
            height: 40,
            width: 150,
            marginVertical: 20
        },
        scrollView: {
            position: 'absolute',
            borderColor: 'red'
        }
    })

    return styles
}

export const texts = {
    en: {
        first: {
            title: `Welcome,\nReact Natvie & Expo`
        },
        page1: {
            title: 'Page1',
            subtitle: 'Page1 Subtitle',
            desc: 'Page1 Desc'
        },
        page2: {
            title: 'Page2',
            subtitle: 'Page2 Subtitle',
            desc: 'Page2 Desc'
        },
        page3: {
            title: 'Page3',
            subtitle: 'Page3 Subtitle',
            desc: 'Page3 Desc'
        },
        signup: 'Sign Up',
        lookAround: 'LOOK AROUND'
    }
}

export function useTexts() {
    const localized = useLocalization(texts)

    return { ...localized }
}
