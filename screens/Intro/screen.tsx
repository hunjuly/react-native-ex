import React from 'react'
import { View } from 'react-native'
import { useWindowDimensions } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { PageIndicator, PageRange, PageScrollView, SafeAreaBottom } from '@/components'
import { FirstPage } from './FirstPage'
import { LookAround } from './LookAround'
import { OtherPage } from './OtherPage'
import { Props, useModel } from './model'
import { useStyles, useTexts } from './resource'

const image1 = require('@/assets/images/intro/page1.png')
const image2 = require('@/assets/images/intro/page2.png')
const image3 = require('@/assets/images/intro/page3.png')

export function Intro(P: Props) {
    const S = useStyles()
    const T = useTexts()
    const M = useModel(P)

    // screenWidth가 아니라 PageScrollView의 onLayout을 받아서 width를 설정해야 한다.
    const screenWidth = useWindowDimensions().width

    const [range, setPageRange] = React.useState<PageRange>({ total: 0, current: 0 })

    const statusBarStyle = range.current === 0 ? 'light' : 'dark'

    return (
        <View style={S.main.container}>
            <StatusBar style={statusBarStyle} />
            <PageScrollView
                style={S.main.scrollView}
                pageWidth={screenWidth}
                range={range}
                setPageRange={setPageRange}
                isFocused={M.isFocused}
            >
                <FirstPage />
                <OtherPage text={T.page1} image={image1} />
                <OtherPage text={T.page2} image={image2} />
                <OtherPage text={T.page3} image={image3} />
            </PageScrollView>
            <PageIndicator style={{ marginBottom: 16 }} range={range} />
            <LookAround range={range} onPress={M.showLookAround} />
            <SafeAreaBottom />
        </View>
    )
}
