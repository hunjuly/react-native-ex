import {
    SafeAreaView as NativeSafeView,
    StatusBar as NativeStatusBar,
    Platform,
    ScrollView,
    StyleProp,
    View,
    ViewStyle
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useColors } from '@/theme'

// landscape 모드는 지원하지 않는다.
export function SafeScrollContainer(P: View['props']) {
    const { style, children, ...others } = P
    const C = useColors()

    const viewStyle = {
        flex: 1,
        paddingTop: NativeStatusBar.currentHeight ?? 0
    }

    return (
        <View style={{ flex: 1, backgroundColor: C.background }}>
            <StatusBar style={C.statusbar} />
            <NativeSafeView style={[viewStyle, style]} {...others}>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    {children}
                </ScrollView>
            </NativeSafeView>
        </View>
    )
}
