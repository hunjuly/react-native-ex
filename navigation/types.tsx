/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParams {}
    }
}

export type RootStackParams = {
    Main: undefined
    NotFound: undefined
    MainNavigator: NavigatorScreenParams<RootTabParams> | undefined
    Intro: undefined
    SignupStep1: undefined
    SignupStep2: { email: string; marketingAgreement: boolean }
    SignupStep3: { email: string; marketingAgreement: boolean }
}

export type RootStackScreenProps<Screen extends keyof RootStackParams> = NativeStackScreenProps<
    RootStackParams,
    Screen
>

export type MainNavigatorProps = RootTabScreenProps<'Home' | 'Settings'>
export type RootTabParams = {
    Home: undefined
    Settings: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParams> = CompositeScreenProps<
    BottomTabScreenProps<RootTabParams, Screen>,
    NativeStackScreenProps<RootStackParams>
>
