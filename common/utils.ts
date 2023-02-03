import AsyncStorage from '@react-native-async-storage/async-storage'

export function isValidEmail(text: string | undefined) {
    if (text) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(text)
    }

    return false
}

export function sleep(timeout: number) {
    return new Promise((resolve) => setTimeout(resolve, timeout))
}

export async function saveValue<T>(storageName: string, value: T | null) {
    if (value) {
        const jsonValue = JSON.stringify({ value })

        await AsyncStorage.setItem(storageName, jsonValue)
    } else {
        await AsyncStorage.removeItem(storageName)
    }
}

export async function loadValue<T>(storageName: string): Promise<T | null> {
    try {
        const jsonValue = await AsyncStorage.getItem(storageName)

        if (jsonValue) {
            const result = JSON.parse(jsonValue) as { value: T }

            return result.value
        }
    } catch (e) {}

    return null
}

export function maskEmail(email: string) {
    const items = email.split('@')

    if (items.length !== 2) return email

    let userId = items[0]

    if (3 < userId.length) {
        userId = userId.substring(0, 3).padEnd(items[0].length, '*')
    } else if (1 === userId.length) {
        userId = '*'
    } else {
        userId = userId.substring(0, 1).padEnd(items[0].length, '*')
    }

    return userId + '@' + items[1]
}

export function generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime() //Timestamp
    var d2 = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0 //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 //random number between 0 and 16
        if (d > 0) {
            //Use timestamp until depleted
            r = (d + r) % 16 | 0
            d = Math.floor(d / 16)
        } else {
            //Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0
            d2 = Math.floor(d2 / 16)
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
    })
}

export function dateToString(date: number) {
    const year = Math.floor(date / 10000)
    const month = `${Math.floor((date % 10000) / 100)}`.padStart(2, '0')
    const day = `${Math.floor(date % 100)}`.padStart(2, '0')

    return `${year}.${month}.${day}`
}

export function dateTimeToString(D: Date) {
    const datetime = `${D.getUTCFullYear()}.${
        D.getUTCMonth() + 1
    }.${D.getUTCDate()} ${D.getUTCHours()}:${D.getUTCMinutes()}:${D.getUTCSeconds()}`

    return datetime
}

export function datetimeToNumber(date: Date) {
    const value = date.getUTCFullYear() * 10000 + (date.getUTCMonth() + 1) * 100 + date.getUTCDate()

    return value
}

// -1234.56 => -1,234.56
export function prettryNumber(value: string | number) {
    let text = ''

    if (typeof value === 'number') {
        text = value.toString()
    } else {
        text = value
    }

    const splitted = `${text}`.split('.')

    if (splitted.length === 0) return '0'

    const integer = splitted[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    if (splitted.length === 1) return integer

    const float = splitted[1]

    return integer + '.' + float
}
