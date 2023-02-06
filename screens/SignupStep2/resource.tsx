import { useLocalization } from '@/theme'

export const texts = {
    en: {
        title: 'Sign up',
        stepOf: 'STEP 2 OF 4'
    }
}

export function useTexts() {
    const localized = useLocalization(texts)

    return { ...localized }
}
