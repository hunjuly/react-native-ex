import { render, screen } from '@testing-library/react-native'
import * as React from 'react'
import { Props } from '../model'
import { SignupStep1 } from '../screen'

let mockModel = {}

jest.mock('../model', () => ({
    useModel: () => mockModel
}))

describe('GoogleOtp screen', () => {
    function renderScreen(values: any) {
        mockModel = {
            isError: false,
            ...values
        }

        const P = {
            navigation: { addListener: () => {} }
        } as unknown as Props

        render(<SignupStep1 {...P} />)
    }

    test('default states', async () => {
        renderScreen({})

        expect(screen.toJSON()).toMatchSnapshot()
    })

    test('all true states ', async () => {
        const message = 'test message'

        renderScreen({
            isError: true
        })

        const displayed = existText(message)
        expect(displayed).toBeTruthy()

        expect(screen.toJSON()).toMatchSnapshot()
    })
})
