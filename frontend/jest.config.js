module.exports = {
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Ensure this file exists for setup
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest', // Use Babel for transforming JavaScript files
    },
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy', // For handling CSS imports
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore these directories
};
