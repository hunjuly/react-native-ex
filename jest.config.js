module.exports = async () => {
    return {
        preset: 'jest-expo',
        setupFiles: ['<rootDir>/jest.setup.ts'],
        setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
        transform: {
            '^.+\\.svg$': 'jest-transformer-svg'
        },
        transformIgnorePatterns: [
            'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-*)'
        ],
        moduleNameMapper: {
            '^@/(.*)$': '<rootDir>/$1'
        }
    }
}
