import React from 'react'
import { Platform } from 'react-native'
import { loadValue, saveValue } from '@/common'
import { serverAddr } from '@/config'
import { RequestContextType, RequestError } from '@/types'

type RefreshToken = { token: string }
const storeName = 'useRequest'

type ResponseType<T> = { data: T; headers: Headers; status: number }

type Legacy = { out1: [{ errCode: string; errMesg: string; authToken: string }] }

export function useRequest() {
    const [refreshToken, setRefreshToken] = React.useState<string | null>(null)
    const [authToken, setAuthToken] = React.useState<string | null>(null)

    React.useEffect(() => {
        const loadRefreshToken = async () => {
            const value = await loadValue<RefreshToken>(storeName)

            setRefreshToken(value ? value.token : null)
        }

        loadRefreshToken()
    }, [])

    const request = React.useCallback(async function request<T>(
        path: string,
        init?: RequestInit
    ): Promise<ResponseType<T>> {
        console.log('request --- ', path, init?.body)

        const url = serverAddr + '/' + path

        const response = await fetch(url, init)

        const data = await response.json()

        if (response.ok) {
            return { data, headers: response.headers, status: response.status }
        }

        throw new RequestError(data.message ?? response.statusText)
    },
    [])

    const refreshAuthToken = React.useCallback(async () => {
        const option = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken })
        }

        const { data } = await request<Legacy>('create-auth-token', option)

        const result = data.out1[0]

        if (result.errCode === '0000') {
            setAuthToken(result.authToken)
            return true
        }

        return false
    }, [])

    const post = React.useCallback(
        async function <T>(path: string, body: any = {}): Promise<T> {
            const mdiacode = Platform.OS === 'ios' ? '12' : '11'

            const option = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...body, mdiacode, authToken })
            }

            const { data, status } = await request<Legacy & T>(path, option)

            if (status === 403) {
                const success = await refreshAuthToken()

                if (success) {
                    const retryOption = { ...option, body: JSON.stringify({ ...body, mdiacode, authToken }) }

                    const { data } = await request<Legacy & T>(path, retryOption)

                    return data
                } else {
                    saveRefreshToken(null)
                    setAuthToken(null)
                }
            }

            return data
        },
        [refreshToken]
    )

    const saveRefreshToken = React.useCallback(async (token: string | null) => {
        setRefreshToken(token)

        await saveValue(storeName, { token })
    }, [])

    const logout = React.useCallback(async () => {
        saveRefreshToken(null)
    }, [request])

    return {
        isLoggedIn: !isNull(refreshToken),
        logout,
        saveRefreshToken,
        setAuthToken,
        post
    }
}

export const RequestContext = React.createContext({} as RequestContextType)
