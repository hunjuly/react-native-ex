import { SafeAreaView as NativeSafeView, StatusBar as NativeStatusBar, View, ViewStyle } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useColors } from '@/theme'

// landscape 모드는 지원하지 않는다.
export function Container(P: View['props']) {
    const { style, children, ...others } = P
    const C = useColors()

    return (
        <View style={[{ flex: 1, backgroundColor: C.background }, style]} {...others}>
            <StatusBar style={C.statusbar} />
            {children}
        </View>
    )
}
