const nextJest = require('next/jest')

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
})

// Add any custom config to be passed to Jest
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  
  // Handle module aliases
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  
  // Coverage configuration
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'hooks/**/*.{js,jsx,ts,tsx}',
    'utils/**/*.{js,jsx,ts,tsx}',
    '!components/**/*.stories.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  
  // Test patterns
  testMatch: [
    '**/__tests__/**/*.(test|spec).(js|jsx|ts|tsx)',
    '**/*.(test|spec).(js|jsx|ts|tsx)',
  ],
  
  // Remove custom transform to let Next.js handle it
  
  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Setup for MSW (Mock Service Worker)
  setupFiles: ['<rootDir>/__mocks__/setupTests.js'],
  
  testTimeout: 10000,
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config)