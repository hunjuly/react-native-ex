import React from 'react'
import { SafeScrollContainer } from '@/components'
import * as Theme from '@/theme'
import { ExamplePopup } from './ExamplePopup'
import { Props, useModel } from './model'
import { useStyles, useTexts } from './resource'

export function Home(P: Props) {
    const M = useModel(P)
    const S = useStyles()
    const T = useTexts()

    return (
        <SafeScrollContainer>
            <ExamplePopup visible={M.modalVisible} onClose={M.hidePopup} />
            <Theme.Button.TextL title="Show Popup" onPress={M.showPopup} />
        </SafeScrollContainer>
    )
}
