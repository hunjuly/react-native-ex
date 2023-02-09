import { act, renderHook } from '@testing-library/react-native'
import * as React from 'react'
import { Props, useModel } from '../model'

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

describe('GoogleOtp model', () => {
    const render = () => {
        const P = {
            navigation: {
                goBack: jest.fn(),
                navigate: jest.fn(),
                addListener: () => {}
            },
            route: {
                email: 'user@mail.com'
            }
        } as unknown as Props

        // const Wrapper: React.FC<{ children: any }> = ({ children }) => {
        //     const value = {
        //         checkAuthCode: () => 'correct',
        //         sendAuthCodeEmail: () => 'success',
        //         email: defaultEmail
        //     } as unknown as SignUpContextType

        //     return <SignUpContext.Provider value={value}>{children}</SignUpContext.Provider>
        // }

        // const result = renderHook(() => useModel(P), { wrapper: Wrapper })

        const result = renderHook(() => useModel(P), {})
        return { ...result, P }
    }

    test.skip('올바른 인증코드(6자리) 입력하면 메인화면 이동', async () => {
        const { result, P } = render()

        await act(async () => {
            result.current.onEmailChanged('000000')
        })

        expect(P.navigation.navigate).toHaveBeenCalledWith('Main')
    })
})
