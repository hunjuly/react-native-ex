import React from 'react'
import { Image, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Text, TextProps } from './Text'
import { useColors } from './useColors'

type ButtonColorProps = {
    borderColor?: string
    backgroundColor: string
    textColor: string
    borderWidth?: number
}

type StateColors = {
    active: ButtonColorProps
    disabled: ButtonColorProps
    hover: ButtonColorProps
}
type ButtonProps = {
    onPress: () => Promise<void> | void
    title: string
    colors?: StateColors
} & TouchableWithoutFeedback['props']

type ImageButtonProps = {
    onPress: () => Promise<void> | void
    source: any
    disabled?: boolean | undefined
} & Image['props']

type TextButtonProps = {
    onPress: () => Promise<void> | void
    title: string
} & TextProps

type DefaultButtonProps = TouchableOpacity['props']

export class Button {
    private static getStateColor(
        colors: StateColors,
        state: 'active' | 'hover',
        disabled: boolean | undefined | null
    ) {
        if (disabled && colors.disabled) {
            return colors.disabled
        }

        if (state === 'hover' && colors.hover) {
            return colors.hover
        }

        if (colors.active) {
            return colors.active
        }

        console.error('colors undefined.')

        return {
            borderColor: 'red',
            backgroundColor: 'red',
            textColor: 'red'
        }
    }

    private static BaseS({ onPress, title, disabled, style, colors }: ButtonProps & { colors: StateColors }) {
        const [state, setState] = React.useState(colors.disabled)

        React.useEffect(() => {
            const color = Button.getStateColor(colors, 'active', disabled)

            setState(color)
        }, [disabled])

        return (
            <TouchableWithoutFeedback
                disabled={disabled}
                onPress={onPress}
                onPressIn={() => setState(Button.getStateColor(colors, 'hover', disabled))}
                onPressOut={() => setState(Button.getStateColor(colors, 'active', disabled))}
            >
                <View
                    style={[
                        {
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                            borderStyle: 'solid'
                        },
                        state,
                        style
                    ]}
                >
                    <Text.ButtonS style={{ color: state.textColor }}>{title}</Text.ButtonS>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    public static SecondaryS(P: ButtonProps) {
        const C = useColors()

        const colors = {
            active: {
                backgroundColor: C.elements6,
                textColor: C.primary,
                borderColor: C.primary,
                borderWidth: 1.5
            },
            disabled: {
                backgroundColor: C.elements4,
                textColor: C.elements3,
                borderColor: '',
                borderWidth: 0
            },
            hover: {
                backgroundColor: C.elements7,
                textColor: C.tint4,
                borderColor: C.elements8,
                borderWidth: 1.5
            }
        }

        return <Button.BaseS colors={colors} {...P} />
    }

    public static PrimaryS(P: ButtonProps) {
        const C = useColors()

        const colors = {
            active: {
                backgroundColor: C.primary,
                textColor: C.elements6
            },
            disabled: {
                backgroundColor: C.elements4,
                textColor: C.elements3
            },
            hover: {
                backgroundColor: C.elements8,
                textColor: C.tint3
            }
        }

        return <Button.BaseS colors={colors} {...P} />
    }

    private static BaseL({
        testID,
        onPress,
        title,
        disabled,
        style,
        colors
    }: ButtonProps & { colors: StateColors }) {
        const [state, setState] = React.useState(colors.disabled)

        React.useEffect(() => {
            const color = Button.getStateColor(colors, 'active', disabled)

            setState(color)
        }, [disabled])

        return (
            <TouchableWithoutFeedback
                testID={testID}
                disabled={disabled}
                onPress={onPress}
                onPressIn={() => setState(Button.getStateColor(colors, 'hover', disabled))}
                onPressOut={() => setState(Button.getStateColor(colors, 'active', disabled))}
            >
                <View
                    style={[
                        {
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                            borderStyle: 'solid'
                        },
                        state,
                        style
                    ]}
                >
                    <Text.ButtonL style={{ color: state.textColor }}>{title}</Text.ButtonL>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    public static SecondaryL(P: ButtonProps) {
        const C = useColors()

        const colors = {
            active: {
                backgroundColor: C.elements6,
                textColor: C.primary,
                borderColor: C.primary,
                borderWidth: 1.5
            },
            disabled: {
                backgroundColor: C.elements4,
                textColor: C.elements3,
                borderColor: '',
                borderWidth: 0
            },
            hover: {
                backgroundColor: C.elements7,
                textColor: C.tint4,
                borderColor: C.elements8,
                borderWidth: 1.5
            }
        }

        return <Button.BaseL colors={colors} {...P} />
    }

    public static PrimaryL(P: ButtonProps) {
        const C = useColors()

        const colors = {
            active: {
                backgroundColor: C.primary,
                textColor: C.elements6
            },
            disabled: {
                backgroundColor: C.elements4,
                textColor: C.elements3
            },
            hover: {
                backgroundColor: C.elements8,
                textColor: C.tint3
            }
        }

        return <Button.BaseL colors={colors} {...P} />
    }

    public static PrimaryTintL(P: ButtonProps) {
        const C = useColors()

        const colors = {
            active: {
                backgroundColor: C.tint1,
                textColor: C.elements6
            },
            disabled: {
                backgroundColor: C.elements4,
                textColor: C.elements3
            },
            hover: {
                backgroundColor: C.elements8,
                textColor: C.tint3
            }
        }

        return <Button.BaseL colors={colors} {...P} />
    }

    public static Image({ testID, onPress, source, disabled, style }: ImageButtonProps) {
        return (
            <TouchableOpacity testID={testID} disabled={disabled} onPress={onPress} style={[style]}>
                <Image source={source} />
            </TouchableOpacity>
        )
    }

    public static Default(P: DefaultButtonProps) {
        return <TouchableOpacity {...P} />
    }

    public static TextS({ onPress, title, style }: TextButtonProps) {
        return (
            <TouchableOpacity onPress={onPress}>
                <Text.ButtonS style={style}>{title}</Text.ButtonS>
            </TouchableOpacity>
        )
    }

    public static TextL({ onPress, title, style }: TextButtonProps) {
        return (
            <TouchableOpacity onPress={onPress}>
                <Text.ButtonL style={style}>{title}</Text.ButtonL>
            </TouchableOpacity>
        )
    }
}
