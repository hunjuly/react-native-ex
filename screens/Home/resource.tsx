import { StyleSheet } from 'react-native'
import { useColors, useLocalization } from '@/theme'

export function useStyles() {
    const C = useColors()

    const styles = StyleSheet.create({
        container: { margin: 20 }
    })

    return styles
}

export function useTexts() {
    const texts = {
        en: {
            hello: 'Hello'
        }
    }

    const localized = useLocalization(texts)

    return { ...localized }
}

export const styles = StyleSheet.create({})
