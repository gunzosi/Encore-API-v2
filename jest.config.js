/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js', 'mjs'],
    testMatch: ['**/*.test.ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
        '^.+\\.mjs$': 'babel-jest', // Handle .mjs files if necessary
    },
    transformIgnorePatterns: [
        "/node_modules/(?!encore\\.dev)" // Adjust this as necessary for your dependencies
    ],
    globals: {
        /*'ts-jest': {
            tsconfig: 'tsconfig.json'
        }*/
    }
};
