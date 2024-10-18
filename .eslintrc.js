module.exports = {
    env: {
        node: true,
        es6: true,
        jest: true,
        browser: true, // Add browser environment for frontend
    },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'react-app', // Include React app settings
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': ['error'],
        'no-unused-vars': ['warn'],
        'no-console': ['off'],
    },
};
