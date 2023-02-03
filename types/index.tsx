export type RequestContextType = {
    isLoggedIn: boolean
    logout: () => void
    saveRefreshToken: (value: string | null) => void
    setAuthToken: (value: string | null) => void
    post: <T>(path: string, body?: unknown) => Promise<T>
}
export class RequestError extends Error {
    constructor(message: string) {
        super(message)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, RequestError)
        }

        this.name = 'RequestError'
    }
}
