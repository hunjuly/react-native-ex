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
                    flex: 1,
                    height: 50,
                    marginHorizontal: 4
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
            title: `Welcome,\nFind out what you can do with Grow.`
        },
        page1: {
            title: 'Manage your assets on the GROW App',
            subtitle: 'GROW MAKES CRYPTO SIMPLE',
            desc: 'Check all various crypto assets as well as the yield status of your subscribed products.'
        },
        page2: {
            title: 'Get compounding yield  6 times a day',
            subtitle: 'GROW MAKES CRYPTO FASTER',
            desc: 'When you use Auto Staking, rewards are claimed and restaked automatically to conveniently compound your rewards.'
        },
        page3: {
            title: 'Product customization creates convenience',
            subtitle: 'GROW MAKES CRYPTO CONVENIENT',
            desc: 'Find products that users can freely set, such as deposit period and amount!'
        },
        login: 'Log in',
        signup: 'Sign up',
        lookAround: 'LOOK AROUND'
    }
}

export function useTexts() {
    const localized = useLocalization(texts)

    return { ...localized }
}
