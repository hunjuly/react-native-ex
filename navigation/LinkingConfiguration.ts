/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */
import { LinkingOptions } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { RootStackParams } from './types'

const linking: LinkingOptions<RootStackParams> = {
    prefixes: [Linking.createURL('/')],
    config: {
        screens: {
            Main: {
                screens: {
                    Home: {
                        screens: {
                            TabOneScreen: 'one'
                        }
                    },
                    Settings: {
                        screens: {
                            TabTwoScreen: 'two'
                        }
                    }
                }
            },
            NotFound: '*'
        }
    }
}

export default linking
