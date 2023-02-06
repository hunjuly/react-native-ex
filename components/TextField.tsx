import React from 'react'
import { Image, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { isValidEmail } from '@/common'
import { useColors } from '@/theme'

type Props = {
    enableCorrectMark?: boolean
    placeholder?: string
    inputType?: 'email' | 'password' | 'default'
    invalid?: boolean
    secureTextEntry?: boolean
    onChange?: ((text: string) => void) | undefined
    onChangeFocus?: ((focused: boolean) => void) | undefined
    onPressStateIcon?: (() => void) | undefined
    onSubmitEditing?: (() => void) | undefined
    currentText?: string | null
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined
    stateIcons?: {
        focused?: any
        normal?: any
    }
    returnKeyType?: 'next' | 'route' | 'search' | 'send' | 'done' | undefined
} & View['props']

function getKeyboardType(inputType: string | undefined) {
    // 'default' | 'numeric' | 'email-address' | 'phone-pad'
    if (inputType === 'email') return 'email-address'

    return 'default'
}

export const TextField = React.forwardRef<TextInput>((P: Props, ref?) => {
    const keyboardType = getKeyboardType(P.inputType)
    const [focused, setFocused] = React.useState(false)

    const C = useColors()
    let borderColor = C.shade1

    if (focused) {
        borderColor = C.primary
    } else if (P.invalid) {
        borderColor = C.accent
    } else if (null === P.currentText || 0 === P.currentText?.length) {
        borderColor = C.elements3
    }

    return (
        <View style={[{ justifyContent: 'center' }, P.style]}>
            <TextInput
                testID={P.testID}
                ref={ref}
                style={[
                    {
                        paddingHorizontal: 14,
                        height: 48,
                        fontFamily: 'Roboto-Regular',
                        fontWeight: '400',
                        fontSize: 16,
                        lineHeight: 20,
                        letterSpacing: 0.5,
                        color: C.elements2,
                        backgroundColor: C.background2,
                        borderBottomColor: borderColor,
                        borderBottomWidth: 2,
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 4
                    }
                ]}
                autoCorrect={false}
                autoCapitalize={P.autoCapitalize}
                placeholder={P.placeholder}
                secureTextEntry={P.secureTextEntry}
                keyboardType={keyboardType}
                placeholderTextColor={C.elements3}
                onChangeText={P.onChange}
                onEndEditing={() => {
                    setFocused(false)

                    if (P.onChangeFocus) P.onChangeFocus(false)
                }}
                onFocus={() => {
                    setFocused(true)

                    if (P.onChangeFocus) P.onChangeFocus(true)
                }}
                defaultValue={P.currentText ?? ''}
                onSubmitEditing={P.onSubmitEditing}
                returnKeyType={P.returnKeyType}
            />
            <TouchableWithoutFeedback onPress={P.onPressStateIcon}>
                <Image
                    source={focused ? P.stateIcons?.focused : P.stateIcons?.normal}
                    style={{ position: 'absolute', right: 8 }}
                />
            </TouchableWithoutFeedback>
        </View>
    )
})

export type EmailValue = {
    text: string
    correct: boolean
}

const warningImage = require('@/assets/images/components/text/text-warning.png')

export function CheckTextField({ forwardedRef, ...P }: Props & { forwardedRef?: React.Ref<TextInput> }) {
    const [normalIcon, setNormalIcon] = React.useState<any>(undefined)

    React.useEffect(() => {
        if (0 === P.currentText?.length) {
            setNormalIcon(undefined)
        } else if (P.invalid) {
            setNormalIcon(warningImage)
        }
    }, [P.currentText, P.invalid])

    return (
        <TextField
            ref={forwardedRef}
            autoCapitalize="none"
            inputType="email"
            stateIcons={{ focused: undefined, normal: normalIcon }}
            {...P}
        />
    )
}

const correctImage = require('@/assets/images/components/text/text-correct.png')

export function EmailField({ forwardedRef, ...P }: Props & { forwardedRef?: React.Ref<TextInput> }) {
    const [normalIcon, setNormalIcon] = React.useState<any>(undefined)

    React.useEffect(() => {
        if (0 === P.currentText?.length) {
            setNormalIcon(undefined)
        } else if (isValidEmail(P.currentText ?? '')) {
            if (P.enableCorrectMark) {
                setNormalIcon(correctImage)
            } else {
                setNormalIcon(undefined)
            }
        } else {
            setNormalIcon(warningImage)
        }
    }, [P.currentText])

    return (
        <TextField
            ref={forwardedRef}
            autoCapitalize="none"
            inputType="email"
            stateIcons={{ focused: undefined, normal: normalIcon }}
            {...P}
        />
    )
}

const showPasswordImage = require('@/assets/images/components/text/password-show.png')
const hidePasswordImage = require('@/assets/images/components/text/password-hide.png')

export function PasswordField({ forwardedRef, ...P }: Props & { forwardedRef?: React.Ref<TextInput> }) {
    const [focusIcon, setFocusIcon] = React.useState(hidePasswordImage)
    const [hidePassword, setHidePassword] = React.useState(true)

    const onPressStateIcon = () => {
        setFocusIcon(hidePassword ? showPasswordImage : hidePasswordImage)
        setHidePassword(!hidePassword)
    }

    return (
        <TextField
            ref={forwardedRef}
            placeholder={'Password'}
            inputType="password"
            stateIcons={{ focused: focusIcon, normal: undefined }}
            onPressStateIcon={onPressStateIcon}
            secureTextEntry={hidePassword}
            {...P}
        />
    )
}
