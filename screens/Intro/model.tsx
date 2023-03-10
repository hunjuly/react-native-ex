import React from 'react'
import { RootStackScreenProps } from '@/navigation/types'

export type Props = RootStackScreenProps<'Intro'>

export function useModel(P: Props) {
    const { navigation } = P

    const [isFocused, setFocused] = React.useState(navigation.isFocused())

    const showLookAround = () => alert('look around')
    const onSignup = () => navigation.navigate('SignupStep1')

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('state', () => {
            setFocused(navigation.isFocused())
        })

        return unsubscribe
    }, [navigation])

    return {
        isFocused,
        showLookAround,
        onSignup
    }
}
