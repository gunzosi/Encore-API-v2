<<<<<<< HEAD
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
=======
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
>>>>>>> f6397a66ea9983c985ca7a6d17231f765b57fc54
