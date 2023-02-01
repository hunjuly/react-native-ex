import { fireEvent, screen } from '@testing-library/react-native'
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'

jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock')

    // The mock for `call` immediately calls the callback which is incorrect
    // So we override it with a no-op
    Reanimated.default.call = () => {}

    return Reanimated
})

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)

// @react-native-community/masked-view @react-navigation/stack

declare global {
    const correctEmail: string
    const defaultEmail: string
    const wrongEmail: string

    const defaultPassword: string
    const correctPassword: string

    const referralCode: string

    function pressByText(text: string): Promise<void>
    function pressByPlaceHolder(holder: string): Promise<void>
    function changeTextByPlaceHolder(holder: string, text: string): Promise<void>
    function changeTextByTestId(testId: string, text: string): Promise<void>
    function pressByTestId(testId: string): Promise<void>
    function existText(text: string): Promise<boolean>
    function getSnapshot(): string
    function getDefaultText<T>(langs: { en: T }): T
}

const g = global as any

g.getDefaultText = <T>(langs: { en: T }) => langs.en

g.pressByText = async (text: string) => {
    const toFire = await screen.getByText(text)

    await fireEvent(toFire, 'press')
}

g.pressByPlaceHolder = async (holder: string) => {
    const toFire = await screen.getByPlaceholderText(holder)

    await fireEvent(toFire, 'press')
}

g.changeTextByPlaceHolder = async (holder: string, text: string) => {
    const toFire = await screen.getByPlaceholderText(holder)

    await fireEvent(toFire, 'changeText', text)
}

g.changeTextByTestId = async (testId: string, text: string) => {
    const toFire = await screen.getByTestId(testId)

    await fireEvent(toFire, 'changeText', text)
}

g.pressByTestId = async (testId: string) => {
    const toFire = await screen.getByTestId(testId)

    await fireEvent(toFire, 'press')
}

g.getSnapshot = () => {
    const json = screen.toJSON()

    return JSON.stringify(json)
}

g.existText = async (text: string) => {
    const res = await screen.queryByText(text)

    return null != res
}
