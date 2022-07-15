module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true,
  },
  extends: [
    'standard',
    'plugin:node/recommended',
    'google',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  overrides: [
    {
      files: ['hardhat.config.js'],
      globals: { task: true },
    },
  ],
  rules: {
    quotes: [
      'warn',
      'single',
    ],
  },
}
