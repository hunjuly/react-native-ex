import { SafeAreaView as DefaultSafeView, StatusBar, View } from 'react-native'

export function SafeAreaTop({ style, ...otherProps }: View['props']) {
    if (StatusBar.currentHeight) {
        return (
            <View
                style={[{ height: StatusBar.currentHeight, backgroundColor: 'transparent' }, style]}
                {...otherProps}
            />
        )
    }

    return <DefaultSafeView style={style} {...otherProps} />
}

export function SafeAreaBottom(P: View['props']) {
    return <DefaultSafeView {...P} />
}

// landscape 모드는 지원하지 않는다.
export function SafeAreaView(P: View['props']) {
    if (StatusBar.currentHeight) {
        return (
            <View
                style={{
                    paddingTop: StatusBar.currentHeight,
                    flex: 1,
                    width: '100%',
                    backgroundColor: 'transparent'
                }}
                {...P}
            />
        )
    }

    return (
        <DefaultSafeView
            style={{
                flex: 1,
                width: '100%',
                backgroundColor: 'transparent'
            }}
            {...P}
        />
    )
}
