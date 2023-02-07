import React from 'react'
import { useWindowDimensions } from 'react-native'
import { TextStyle } from 'react-native'
import { useColors, useLocalization } from '@/theme'

export function useStyles() {
    const screenWidth = useWindowDimensions().width

    const C = useColors()

    const styles = React.useMemo(
        () => ({
            main: {
                container: {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                },
                buttonContainer: {
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    marginTop: 4,
                    marginBottom: 24,
                    paddingHorizontal: 21
                },
                button: {
                    height: 40,
                    width: 150,
                    marginVertical: 20
                },
                scrollView: {
                    position: 'absolute'
                }
            },
            first: {
                container: {
                    flex: 1,
                    alignItems: 'center',
                    width: screenWidth
                },
                background: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                },
                title: {
                    marginHorizontal: 24,
                    marginTop: 40,
                    color: C.elements6
                },
                logo: {
                    marginTop: 95
                }
            },
            other: {
                container: {
                    flex: 1,
                    backgroundColor: C.background2,
                    width: screenWidth
                },
                top: {
                    marginTop: 40,
                    marginHorizontal: 24,
                    backgroundColor: 'transparent'
                },
                subtitle: {
                    fontFamily: 'OpenSans-SemiBold',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: 14,
                    lineHeight: 19,
                    letterSpacing: -0.4,
                    color: C.primary
                },
                title: {
                    color: C.elements1
                },
                image: {
                    width: '100%',
                    flex: 1,
                    marginVertical: 12
                },
                desc: {
                    height: 80,
                    marginBottom: 152,
                    justifyContent: 'center',
                    backgroundColor: 'transparent'
                },
                descText: {
                    textAlign: 'center',
                    marginHorizontal: 8,
                    color: C.elements2
                }
            }
        }),
        [C, screenWidth]
    )

    type KeysMain = keyof typeof styles.main
    type KeysFirst = keyof typeof styles.first
    type KeysOther = keyof typeof styles.other

    return styles as {
        main: { [key in KeysMain]: TextStyle }
        first: { [key in KeysFirst]: TextStyle }
        other: { [key in KeysOther]: TextStyle }
    }
}

export const texts = {
    en: {
        first: {
            title: `Welcome,\nReact Natvie & Expo`
        },
        page1: {
            title: 'Page1',
            subtitle: 'Page1 Subtitle',
            desc: 'Page1 Desc'
        },
        page2: {
            title: 'Page2',
            subtitle: 'Page2 Subtitle',
            desc: 'Page2 Desc'
        },
        page3: {
            title: 'Page3',
            subtitle: 'Page3 Subtitle',
            desc: 'Page3 Desc'
        },
        signup: 'Sign Up',
        lookAround: 'LOOK AROUND'
    }
}

export function useTexts() {
    const localized = useLocalization(texts)

    return { ...localized }
}
