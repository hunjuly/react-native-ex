export {}

declare global {
    function isNull(arg: any): boolean
    function isNotNull(arg: any): boolean
    function notUsed(...args: any[]): void
    const Log: {
        error(message: string): void
    }
}

const g = global as any
g.notUsed = (..._args: any) => {}

g.isNull = (arg: any) => {
    if (arg === undefined) return true
    if (arg === null) return true

    return false
}

g.isNotNull = (arg: any) => {
    return !isNull(arg)
}

class Log {
    static error(message: string) {
        const stack = new Error().stack

        if (stack) {
            const items = stack.split('\n')
            const funcName = items[1].split('@')[0]

            // __DEV__는 필요없다. 베타테스트를 나타내는 debugMode가 필요하다.
            if (__DEV__) {
                console.error(message, funcName)
                alert(message)
            }
        } else {
            if (__DEV__) {
                console.error(message)
                alert(message)
            }
        }
    }
}
g.Log = Log
