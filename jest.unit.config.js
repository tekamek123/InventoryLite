/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/utils/**/*.test.js'],
  transform: {
    '^.+\\.js$': ['babel-jest', {
      configFile: false,
      presets: [['@babel/preset-env', { targets: { node: 'current' } }]]
    }]
  }
};
