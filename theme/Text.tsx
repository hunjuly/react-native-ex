import { ColorValue, Text as DefaultText, TextStyle as DefaultTextStyle, View } from 'react-native'

type TextStyle = {
    fontFamily: string | undefined
    fontSize: number | undefined
    fontWeight:
        | 'normal'
        | 'bold'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900'
        | undefined
    letterSpacing: number | undefined
    lineHeight: number | undefined
}

export type TextProps = {
    value?: string | JSX.Element | undefined | boolean
    color?: ColorValue
} & DefaultText['props']

function makeText(opt: TextStyle, P: TextProps) {
    const { style, value, color, ...otherProps } = P

    if (value) {
        return (
            // TODO 디폴트 컬러를 하드코딩했다. 고쳐라
            <DefaultText style={[{ color: color ?? '#020725' }, opt, style]} {...otherProps}>
                {P.value}
            </DefaultText>
        )
    } else {
        return <DefaultText style={[opt, style]} {...otherProps} />
    }
}

export class Text {
    public static H1(P: TextProps) {
        return makeText(
            {
                fontFamily: 'Roboto-Bold',
                fontWeight: '700',
                fontSize: 32,
                lineHeight: 37.5,
                letterSpacing: 0.25
            },
            P
        )
    }

    public static H2(P: TextProps) {
        return makeText(
            {
                fontFamily: 'Roboto-Regular',
                fontWeight: '400',
                fontSize: 28,
                lineHeight: 32.8,
                letterSpacing: 0
            },
            P
        )
    }

    public static Body1(P: TextProps) {
        return makeText(
            {
                fontFamily: 'Roboto-Regular',
                fontWeight: '400',
                fontSize: 16,
                lineHeight: 20,
                letterSpacing: 0.5
            },
            P
        )
    }

    public static Body2(P: TextProps) {
        return makeText(
            {
                fontFamily: 'Roboto-Regular',
                fontWeight: '400',
                fontSize: 15,
                lineHeight: 20,
                letterSpacing: 0.25
            },
            P
        )
    }

    public static ButtonL(P: TextProps) {
        return makeText(
            {
                fontFamily: 'Roboto-Medium',
                fontWeight: '500',
                fontSize: 18,
                lineHeight: 30,
                letterSpacing: 0.18
            },
            P
        )
    }

    public static ButtonS(P: TextProps) {
        return makeText(
            {
                fontFamily: 'Roboto-Medium',
                fontWeight: '500',
                fontSize: 14,
                lineHeight: 30,
                letterSpacing: 0.18
            },
            P
        )
    }
}
