// Optional: configure or set up a testing framework before each test
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),
}))

// Mock next/navigation for Next.js 13+ app directory
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock date-fns to avoid timezone issues in tests
jest.mock('date-fns', () => ({
  ...jest.requireActual('date-fns'),
  format: (date, formatStr) => {
    if (formatStr === 'MMM dd') {
      return 'Dec 25'
    }
    if (formatStr === 'MMM d, yyyy') {
      return 'Dec 25, 2024'
    }
    return jest.requireActual('date-fns').format(date, formatStr)
  },
  startOfWeek: jest.fn(() => new Date('2024-01-01')),
  isAfter: jest.fn((date, compareDate) => {
    return new Date(date).getTime() > new Date(compareDate).getTime()
  }),
}))

// Global test setup
beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks()
})

// Suppress console errors during tests unless needed
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})