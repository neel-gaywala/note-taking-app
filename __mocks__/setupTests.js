// This file is run before each test file

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock window.HTMLElement.prototype.scrollIntoView
window.HTMLElement.prototype.scrollIntoView = jest.fn()

// Mock fetch globally
global.fetch = jest.fn()

// Mock console.warn for tests
const originalWarn = console.warn
console.warn = (...args) => {
  // Suppress specific React warnings during tests
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('componentWillMount') ||
     args[0].includes('componentWillReceiveProps') ||
     args[0].includes('componentWillUpdate'))
  ) {
    return
  }
  originalWarn(...args)
}