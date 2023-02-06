import React from 'react'
import { Image, TextStyle, TouchableWithoutFeedback, View } from 'react-native'
import { Text } from './Text'

type CheckBoxProps = {
    onChange: (checked: boolean) => void
    checked: boolean
    textStyle: TextStyle
    text: string | JSX.Element
} & View['props']

const checkImage = require('@/assets/images/components/checkbox/check.png')
const uncheckImage = require('@/assets/images/components/checkbox/uncheck.png')

export function CheckBox({ testID, onChange, checked, style, textStyle, text }: CheckBoxProps) {
    // checkImage, uncheckImage의 값은 그냥 1이다.
    // 그래서 snapshot을 찍으면 check,uncheck가 똑같이 보인다.
    // 그래서 눈에 띄지 않는 style을.overflow 추가했다.
    return (
        <View style={[{ flexDirection: 'row' }, style]}>
            <TouchableWithoutFeedback testID={testID} onPress={() => onChange(!checked)}>
                <Image
                    source={checked ? checkImage : uncheckImage}
                    style={{
                        marginTop: 0,
                        marginLeft: 12,
                        marginRight: 14,
                        overflow: checked ? 'visible' : 'hidden'
                    }}
                />
            </TouchableWithoutFeedback>
            <View style={{ flex: 1 }}>
                <Text.Body2 style={textStyle}>{text}</Text.Body2>
            </View>
        </View>
    )
}
