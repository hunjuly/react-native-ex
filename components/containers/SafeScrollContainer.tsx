import { SafeAreaView as NativeSafeView, StatusBar as NativeStatusBar, ScrollView, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useColors } from '@/theme'

// landscape 모드는 지원하지 않는다.
export function SafeScrollContainer(P: View['props']) {
    const { style, children, ...others } = P
    const C = useColors()

    const paddingTop = NativeStatusBar.currentHeight ?? 0

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: C.background
            }}
        >
            <StatusBar style={C.statusbar} />
            <NativeSafeView style={{ flex: 1, paddingTop }} {...others}>
                <ScrollView
                    style={style}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>
            </NativeSafeView>
        </View>
    )
}
