import React from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native'
import { PageRange } from './PageRange'

type Props = {
    pageWidth: number
    range: PageRange
    setPageRange: (range: PageRange) => void
    isFocused: boolean
} & View['props']

// 주의사항
// scrollview의 width의 children의 width가 일치해야 한다.
// 그러니까 가로 스크롤 되는 view가 가로폭을 꽉 채워야 한다.
export function PageScrollView({ style, children, pageWidth, range, setPageRange, isFocused }: Props) {
    const scrollViewRef = React.useRef<ScrollView | null>(null)
    const firstPage = pageWidth

    React.useEffect(() => {
        const interval = setTimeout(() => {
            if (isFocused) {
                const nextPage = firstPage + (range.current + 1) * pageWidth
                scrollViewRef.current?.scrollTo({ x: nextPage, animated: true })
            }
        }, 3000)

        return () => clearTimeout(interval)
    }, [range, isFocused])

    const pages = children as JSX.Element[]

    const firstMargin = React.useMemo(() => React.cloneElement(pages[pages.length - 1]), [pages])
    const lastMargin = React.useMemo(() => React.cloneElement(pages[0]), [pages])

    const onInitialize = (_w: number, _h: number) => {
        scrollViewRef.current?.scrollTo({ x: pageWidth, animated: false })
    }

    // onMomentumScrollEnd 이벤트가 안드로이드에서는 손을 떼는 순간부터 여러번 호출되기 때문에 사용하지 않았다.
    const onScroll = (scrollEvent: NativeSyntheticEvent<NativeScrollEvent>) => {
        const event = scrollEvent.nativeEvent

        // 현재 스크롤 위치
        const contentOffset = event.contentOffset.x
        // 현재 패이지 번호
        const currentPage = range.current
        // 반복을 위해서 제일 앞에 삽입한 마지막 페이지의 크기
        const firstMargin = pageWidth

        // 현재 페이지의 시작위치
        const currentPageOffset = currentPage * pageWidth + firstMargin

        // 뒤로 가면 음수가 된다.
        let progress = Math.abs(contentOffset - currentPageOffset) / pageWidth

        /*
         1. 마지막에서 처음으로 가면 lastMargin에서 firstPage로 이동하는 것이다.
            이러면 한 번에 여러칸을 움직이기 때문에 progress가 1(아마도 pages.length)이 넘게 된다.
         2. 안드로이드에서 progress의 값이 정확하게 1이 안 되고 1.0000000741746715 처럼 된다.
            부동소수점 문제로 보인다. 그래서 1 < progress하면 정상인 경우까지 포함되므로 1.1 < progress했다.
        */
        if (1.1 < progress) {
            progress = 0
        }

        const rightScroll = 0 < contentOffset - currentPageOffset

        let toPage = rightScroll ? currentPage + 1 : currentPage - 1

        const isFirstMargin = toPage === pages.length
        const isLastMargin = toPage === -1

        if (isFirstMargin) {
            toPage = 0
        } else if (isLastMargin) {
            toPage = pages.length - 1
        }

        const isPageMoving = progress < 1

        if (isPageMoving) {
            setPageRange({
                total: pages.length,
                current: currentPage,
                to: toPage,
                progress
            })
        } else {
            // 여기로 오면 화면의 이동이 끝난 것이다.
            // first or last 페이지라면 무한 로테이션을 위해서 페이지 교환을 한다.
            setPageRange({ total: pages.length, current: toPage })

            if (isFirstMargin || isLastMargin) {
                const toPageOffset = toPage * pageWidth + firstMargin

                scrollViewRef.current?.scrollTo({ x: toPageOffset, animated: false })
            }
        }
    }

    return (
        <ScrollView
            ref={scrollViewRef}
            style={[style, { flexDirection: 'row', height: '100%', width: '100%' }]}
            pagingEnabled={true}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={1}
            onScroll={onScroll}
            onContentSizeChange={onInitialize}
        >
            {firstMargin}
            {pages}
            {lastMargin}
        </ScrollView>
    )
}
