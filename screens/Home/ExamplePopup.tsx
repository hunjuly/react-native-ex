import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useColors, useLocalization } from '@/theme'

interface PopupProps {
    visible: boolean
    setVisible: (value: boolean) => void
}

export function ExamplePopup(P: PopupProps) {
    // popup은 아래처럼 Modal로 구현하면 된다.
    // BottomSheet는 추가 설치해라
    const S = useStyles()

    return (
        <Modal
            animationType="fade"
            transparent={true}
            statusBarTranslucent={true}
            visible={P.visible}
            onRequestClose={() => {
                P.setVisible(!P.visible)
            }}
            onShow={() => {
                console.log('onShow')
            }}
        >
            <View style={S.centeredView}>
                <StatusBar style={'light'} />
                <View style={S.modalView}>
                    <Text style={S.modalText}>Hello World!</Text>
                    <Pressable style={[S.button, S.buttonClose]} onPress={() => P.setVisible(!P.visible)}>
                        <Text style={S.textStyle}>Hide Modal</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export function useStyles() {
    const C = useColors()

    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0007'
        },
        modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
        },
        button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2
        },
        buttonOpen: {
            backgroundColor: '#F194FF'
        },
        buttonClose: {
            backgroundColor: '#2196F3'
        },
        textStyle: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center'
        },
        modalText: {
            marginBottom: 15,
            textAlign: 'center'
        }
    })

    return styles
}
