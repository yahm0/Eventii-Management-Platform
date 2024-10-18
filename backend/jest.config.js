module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    setupFiles: ['dotenv/config'], // Load environment variables for tests
    moduleFileExtensions: ['js', 'json', 'node'],
};
