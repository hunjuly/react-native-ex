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

    public static H3(P: TextProps) {
        return makeText(
            {
                fontFamily: 'Roboto-Medium',
                fontWeight: '500',
                fontSize: 20,
                lineHeight: 22,
                letterSpacing: 0.15
            },
            P
        )
    }

    public static H4(P: TextProps) {
        return makeText(
            {
                fontFamily: 'Roboto-Regular',
                fontWeight: '400',
                fontSize: 24,
                lineHeight: 28,
                letterSpacing: 0
            },
            P
        )
    }

    public static Title1(P: TextProps) {
        return makeText(
            {
                fontFamily: 'Roboto-Regular',
                fontWeight: '400',
                fontSize: 22,
                lineHeight: 28,
                letterSpacing: 0
            },
            P
        )
    }

    public static Title2(P: TextProps) {
        return makeText(
            {
                fontFamily: 'Roboto-Medium',
                fontWeight: '500',
                fontSize: 16,
                lineHeight: 24,
                letterSpacing: 0.15
            },
            P
        )
    }

    public static Title3(P: TextProps) {
        return makeText(
            {
                fontFamily: 'Roboto-Medium',
                fontWeight: '500',
                fontSize: 14,
                lineHeight: 20,
                letterSpacing: 0.1
            },
            P
        )
    }

    public static Section(P: TextProps) {
        return makeText(
            {
                fontFamily: 'Roboto-Regular',
                fontWeight: '500',
                fontSize: 14,
                lineHeight: 20,
                letterSpacing: 0.1
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

    public static Caption(P: TextProps) {
        return makeText(
            {
                fontFamily: 'Roboto-Regular',
                fontWeight: '400',
                fontSize: 12,
                lineHeight: 14.1,
                letterSpacing: 0.4
            },
            P
        )
    }

    public static CaptionS(P: TextProps) {
        return makeText(
            {
                fontFamily: 'Roboto-Regular',
                fontWeight: '500',
                fontSize: 10,
                lineHeight: 20,
                letterSpacing: 0.1
            },
            P
        )
    }

    public static Caption2(P: TextProps) {
        return makeText(
            {
                fontFamily: 'Roboto-Regular',
                fontWeight: '400',
                fontSize: 10,
                lineHeight: 12,
                letterSpacing: 0.4
            },
            P
        )
    }
    public static Subtext(P: TextProps) {
        return makeText(
            {
                fontFamily: 'Roboto-Regular',
                fontWeight: '400',
                fontSize: 15,
                lineHeight: 17.6,
                letterSpacing: 0.0
            },
            P
        )
    }

    public static Custom(P: TextProps) {
        return makeText(
            {
                fontFamily: '',
                fontWeight: '400',
                fontSize: 1,
                lineHeight: 1,
                letterSpacing: 1
            },
            P
        )
    }

    public static PreloginTitle(P: TextProps) {
        return makeText(
            {
                fontFamily: 'OpenSans-Bold',
                fontWeight: '700',
                fontSize: 30,
                lineHeight: 45,
                letterSpacing: -0.5
            },
            P
        )
    }
    public static PreloginDesc(P: TextProps) {
        return makeText(
            {
                fontFamily: 'OpenSans-Light',
                fontWeight: '300',
                fontSize: 30,
                lineHeight: 45,
                letterSpacing: -0.5
            },
            P
        )
    }
    public static Link(P: TextProps) {
        return makeText(
            {
                fontFamily: 'Roboto-Medium',
                fontWeight: '500',
                fontSize: 14,
                lineHeight: 20,
                letterSpacing: 0.1
            },
            P
        )
    }

    public static MoreSmall(P: TextProps) {
        return makeText(
            {
                fontFamily: 'Roboto-Regular',
                fontWeight: '500',
                fontSize: 12,
                lineHeight: 20,
                letterSpacing: 0.1
            },
            P
        )
    }

    public static LabelMedium(P: TextProps) {
        return makeText(
            {
                fontFamily: 'Roboto-Regular',
                fontWeight: '500',
                fontSize: 12,
                lineHeight: 16,
                letterSpacing: 0.5
            },
            P
        )
    }
}
