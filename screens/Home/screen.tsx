import React from 'react'
import { ScrollView } from 'react-native'
import { SafeContainer } from '@/components'
import { Button } from '@/theme'
import { Props, useModel } from './model'
import { useStyles, useTexts } from './resource'

export function Home(P: Props) {
    const M = useModel(P)
    const S = useStyles()
    const T = useTexts()

    return (
        <SafeContainer>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <Button.TextS title="Modal popup" onPress={() => {}} />
                <Button.TextS title="Modal popup" onPress={() => {}} />
            </ScrollView>
        </SafeContainer>
    )
}
