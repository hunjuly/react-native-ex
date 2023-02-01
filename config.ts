import app from './app.json'

export const version = __DEV__
    ? `${app.expo.version}(${app.expo.ios.buildNumber}, ${app.expo.android.versionCode})`
    : app.expo.version
export const serverAddr = 'http://localhost:3000'
export const animationDuration = 250
