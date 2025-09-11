import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  // Create a new QueryClient instance for each test to avoid state leakage
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Turn off retries for tests
        retry: false,
        // Turn off caching
        staleTime: 0,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  })

  return React.createElement(QueryClientProvider, { client: queryClient }, children)
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

// Re-export everything
export * from '@testing-library/react'

// Override render method
export { customRender as render }

// Helper function to create mock notes
export const createMockNote = (overrides = {}) => ({
  id: 1,
  title: 'Test Note',
  content: 'This is a test note content',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  ...overrides,
})

// Helper function to create multiple mock notes
export const createMockNotes = (count = 3) => {
  return Array.from({ length: count }, (_, index) => 
    createMockNote({
      id: index + 1,
      title: `Test Note ${index + 1}`,
      content: `This is test note content ${index + 1}`,
      createdAt: new Date(2024, 0, index + 1).toISOString(),
      updatedAt: new Date(2024, 0, index + 1).toISOString(),
    })
  )
}

// Helper function to create mock chart data
export const createMockChartData = () => [
  { date: '2024-01-01', count: 2 },
  { date: '2024-01-02', count: 1 },
  { date: '2024-01-03', count: 3 },
]

// Helper function to create mock stats
export const createMockStats = () => ({
  totalNotes: 10,
  notesThisWeek: 3,
  mostFrequentWord: 'test',
  longestNote: createMockNote({
    id: 5,
    title: 'Longest Note',
    content: 'This is the longest note with lots of content to make it the longest one in the collection.',
  }),
})

// Helper function to wait for loading states to complete
export const waitForLoadingToFinish = () => 
  new Promise((resolve) => setTimeout(resolve, 0))

// Mock API response helpers
export const mockApiResponse = (data: any, delay = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,
        json: async () => data,
        status: 200,
        statusText: 'OK',
      })
    }, delay)
  })
}

export const mockApiError = (message = 'API Error', status = 500) => {
  return Promise.reject(new Error(message))
}