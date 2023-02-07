import { SafeAreaView as DefaultSafeView, StatusBar as DefaultStatusBar, View, ViewStyle } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useColors } from '@/theme'

// landscape 모드는 지원하지 않는다.
export function SafeContainer(P: View['props']) {
    const { style, ...others } = P
    const C = useColors()

    const viewStyle = {
        flex: 1,
        backgroundColor: C.elements6,
        paddingTop: DefaultStatusBar.currentHeight,
        ...(style as ViewStyle)
    }

    // StatusBar의 값은 useTheme에서 가져와야 한다.

    return (
        <View style={viewStyle}>
            <StatusBar style={'dark'} />
            <DefaultSafeView style={{ flex: 1 }} {...others} />
        </View>
    )
}
