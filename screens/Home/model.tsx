import React from 'react'
import { RootTabScreenProps } from '@/navigation/types'

export type Props = RootTabScreenProps<'Home'>

export function useModel(P: Props) {
    const { navigation } = P

    const [modalVisible, setModalVisible] = React.useState(false)

    const showPopup = () => {
        setModalVisible(true)
    }

    const hidePopup = () => {
        setModalVisible(false)
    }

    return {
        modalVisible,
        showPopup,
        hidePopup
    }
}
