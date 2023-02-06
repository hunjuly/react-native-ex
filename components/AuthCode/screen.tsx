import React from 'react'
import { TextInput, View } from 'react-native'
import { Button } from '../Button'
import { Text } from '../Text'
import { DigitBox } from './DigitBox'
import { Props, useModel } from './model'
import { useStyles, useTexts } from './resource'

export function AuthCode(P: Props) {
    const S = useStyles(P.style)
    const T = useTexts()
    const M = useModel(P)

    const { isError, testID } = P

    return (
        <View style={S.container}>
            <View style={S.digits}>
                <DigitBox text={M.text} index={0} isError={isError} />
                <DigitBox text={M.text} index={1} isError={isError} />
                <DigitBox text={M.text} index={2} isError={isError} />
                <DigitBox text={M.text} index={3} isError={isError} />
                <DigitBox text={M.text} index={4} isError={isError} />
                <DigitBox text={M.text} index={5} isError={isError} />
                <TextInput
                    ref={M.inputRef}
                    testID={testID}
                    onChangeText={M.checkText}
                    maxLength={6}
                    style={S.textInput}
                    keyboardType={'number-pad'}
                    caretHidden={true}
                    blurOnSubmit={true}
                    autoFocus={false}
                    autoCorrect={false}
                    value={M.text}
                />
            </View>
            <Text.Caption style={S.caption} value={isError && T.caption} />
            <Button.TextS title="Paste" onPress={M.paste} style={S.paste} />
        </View>
    )
}
