import React from 'react'
import { SafeScrollContainer } from '@/components'
import { Button } from '@/theme'
import { ExamplePopup } from './ExamplePopup'
import { Props, useModel } from './model'
import { useStyles, useTexts } from './resource'

export function Home(P: Props) {
    const M = useModel(P)
    const S = useStyles()
    const T = useTexts()

    const [modalVisible, setModalVisible] = React.useState(true)

    return (
        <SafeScrollContainer style={S.container}>
            <ExamplePopup visible={modalVisible} setVisible={setModalVisible} />
            <Button.TextL
                title="FadeModal popup"
                onPress={() => {
                    setModalVisible(!modalVisible)
                }}
            />
            <Button.TextL title="Modal popup" onPress={() => {}} />
        </SafeScrollContainer>
    )
}
