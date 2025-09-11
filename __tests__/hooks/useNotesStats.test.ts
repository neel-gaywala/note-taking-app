import { renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { useNotesStats } from '@/hooks/useNotesStats'
import { useNotes } from '@/hooks/useNotes'
import { createMockNote, createMockNotes } from '../utils/test-utils'

// Mock the useNotes hook
jest.mock('@/hooks/useNotes')
const mockUseNotes = useNotes as jest.MockedFunction<typeof useNotes>

// date-fns is already mocked globally in jest.setup.js

describe('useNotesStats Hook', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false, staleTime: 0, gcTime: 0 },
      },
    })
    jest.clearAllMocks()
  })

  const createWrapper = ({ children }: { children: React.ReactNode }) => {
    return React.createElement(QueryClientProvider, { client: queryClient }, children)
  }

  it('should return loading state when notes are loading', () => {
    mockUseNotes.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isSuccess: false,
      isError: false,
    } as any)

    const { result } = renderHook(() => useNotesStats(), {
      wrapper: createWrapper,
    })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.stats).toBeDefined()
    expect(result.current.chartData).toBeDefined()
  })

  it('should return error state when notes have error', () => {
    const mockError = new Error('Failed to load notes')
    mockUseNotes.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: mockError,
      isSuccess: false,
      isError: true,
    } as any)

    const { result } = renderHook(() => useNotesStats(), {
      wrapper: createWrapper,
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(mockError)
  })

  it('should calculate total notes correctly', () => {
    const mockNotes = createMockNotes(5)
    mockUseNotes.mockReturnValue({
      data: mockNotes,
      isLoading: false,
      error: null,
      isSuccess: true,
      isError: false,
    } as any)

    const { result } = renderHook(() => useNotesStats(), {
      wrapper: createWrapper,
    })

    expect(result.current.stats.totalNotes).toBe(5)
  })

  it('should calculate notes this week correctly', () => {
    const notesThisWeek = [
      createMockNote({ id: 1, createdAt: '2024-01-05T00:00:00.000Z' }),
      createMockNote({ id: 2, createdAt: '2024-01-06T00:00:00.000Z' }),
    ]
    const notesLastWeek = [
      createMockNote({ id: 3, createdAt: '2023-12-25T00:00:00.000Z' }),
    ]

    mockUseNotes.mockReturnValue({
      data: [...notesThisWeek, ...notesLastWeek],
      isLoading: false,
      error: null,
      isSuccess: true,
      isError: false,
    } as any)

    const { result } = renderHook(() => useNotesStats(), {
      wrapper: createWrapper,
    })

    expect(result.current.stats.notesThisWeek).toBe(2)
  })

  it('should find most frequent word correctly', () => {
    const notes = [
      createMockNote({
        id: 1,
        title: 'React testing guide',
        content: 'React is great for testing components. React components are testable.',
      }),
      createMockNote({
        id: 2,
        title: 'JavaScript testing',
        content: 'Testing JavaScript code with Jest. Testing is important.',
      }),
    ]

    mockUseNotes.mockReturnValue({
      data: notes,
      isLoading: false,
      error: null,
      isSuccess: true,
      isError: false,
    } as any)

    const { result } = renderHook(() => useNotesStats(), {
      wrapper: createWrapper,
    })

    // "testing" appears 4 times, should be the most frequent
    expect(result.current.stats.mostFrequentWord).toBe('testing')
  })

  it('should return "N/A" for most frequent word when no valid words exist', () => {
    const notes = [
      createMockNote({
        id: 1,
        title: 'a an the',
        content: 'is it of on',
      }),
    ]

    mockUseNotes.mockReturnValue({
      data: notes,
      isLoading: false,
      error: null,
      isSuccess: true,
      isError: false,
    } as any)

    const { result } = renderHook(() => useNotesStats(), {
      wrapper: createWrapper,
    })

    expect(result.current.stats.mostFrequentWord).toBe('N/A')
  })

  it('should find longest note correctly', () => {
    const notes = [
      createMockNote({ id: 1, content: 'Short' }),
      createMockNote({ id: 2, content: 'This is a much longer note content that should be the longest' }),
      createMockNote({ id: 3, content: 'Medium length content' }),
    ]

    mockUseNotes.mockReturnValue({
      data: notes,
      isLoading: false,
      error: null,
      isSuccess: true,
      isError: false,
    } as any)

    const { result } = renderHook(() => useNotesStats(), {
      wrapper: createWrapper,
    })

    expect(result.current.stats.longestNote).toEqual(notes[1])
  })

  it('should return null for longest note when no notes exist', () => {
    mockUseNotes.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      isSuccess: true,
      isError: false,
    } as any)

    const { result } = renderHook(() => useNotesStats(), {
      wrapper: createWrapper,
    })

    expect(result.current.stats.longestNote).toBeNull()
  })

  it('should generate chart data correctly', () => {
    const notes = [
      createMockNote({ id: 1, createdAt: '2024-01-01T10:00:00.000Z' }),
      createMockNote({ id: 2, createdAt: '2024-01-01T14:00:00.000Z' }),
      createMockNote({ id: 3, createdAt: '2024-01-02T09:00:00.000Z' }),
      createMockNote({ id: 4, createdAt: '2024-01-03T15:00:00.000Z' }),
    ]

    mockUseNotes.mockReturnValue({
      data: notes,
      isLoading: false,
      error: null,
      isSuccess: true,
      isError: false,
    } as any)

    const { result } = renderHook(() => useNotesStats(), {
      wrapper: createWrapper,
    })

    expect(result.current.chartData).toEqual([
      { date: '2024-01-01', count: 2 },
      { date: '2024-01-02', count: 1 },
      { date: '2024-01-03', count: 1 },
    ])
  })

  it('should limit chart data to last 14 entries', () => {
    // Create 20 notes across 20 different days
    const notes = Array.from({ length: 20 }, (_, index) =>
      createMockNote({
        id: index + 1,
        createdAt: `2024-01-${String(index + 1).padStart(2, '0')}T00:00:00.000Z`,
      })
    )

    mockUseNotes.mockReturnValue({
      data: notes,
      isLoading: false,
      error: null,
      isSuccess: true,
      isError: false,
    } as any)

    const { result } = renderHook(() => useNotesStats(), {
      wrapper: createWrapper,
    })

    expect(result.current.chartData).toHaveLength(14)
    // Should be the last 14 days (Jan 7-20)
    expect(result.current.chartData[0].date).toBe('2024-01-07')
    expect(result.current.chartData[13].date).toBe('2024-01-20')
  })

  it('should sort chart data by date', () => {
    const notes = [
      createMockNote({ id: 1, createdAt: '2024-01-03T00:00:00.000Z' }),
      createMockNote({ id: 2, createdAt: '2024-01-01T00:00:00.000Z' }),
      createMockNote({ id: 3, createdAt: '2024-01-02T00:00:00.000Z' }),
    ]

    mockUseNotes.mockReturnValue({
      data: notes,
      isLoading: false,
      error: null,
      isSuccess: true,
      isError: false,
    } as any)

    const { result } = renderHook(() => useNotesStats(), {
      wrapper: createWrapper,
    })

    expect(result.current.chartData).toEqual([
      { date: '2024-01-01', count: 1 },
      { date: '2024-01-02', count: 1 },
      { date: '2024-01-03', count: 1 },
    ])
  })

  it('should handle empty notes array', () => {
    mockUseNotes.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      isSuccess: true,
      isError: false,
    } as any)

    const { result } = renderHook(() => useNotesStats(), {
      wrapper: createWrapper,
    })

    expect(result.current.stats).toEqual({
      totalNotes: 0,
      notesThisWeek: 0,
      mostFrequentWord: 'N/A',
      longestNote: null,
    })
    expect(result.current.chartData).toEqual([])
  })

  it('should filter out stop words and short words', () => {
    const notes = [
      createMockNote({
        id: 1,
        title: 'a an the is it testing code',
        content: 'to be or not to be that is the question about testing',
      }),
    ]

    mockUseNotes.mockReturnValue({
      data: notes,
      isLoading: false,
      error: null,
      isSuccess: true,
      isError: false,
    } as any)

    const { result } = renderHook(() => useNotesStats(), {
      wrapper: createWrapper,
    })

    // "testing" should be the most frequent non-stop word
    expect(result.current.stats.mostFrequentWord).toBe('testing')
  })

  it('should handle notes with special characters in content', () => {
    const notes = [
      createMockNote({
        id: 1,
        title: 'Special chars!',
        content: 'Hello, world! This is a test... with punctuation? Yes, testing!',
      }),
    ]

    mockUseNotes.mockReturnValue({
      data: notes,
      isLoading: false,
      error: null,
      isSuccess: true,
      isError: false,
    } as any)

    const { result } = renderHook(() => useNotesStats(), {
      wrapper: createWrapper,
    })

    expect(result.current.stats.mostFrequentWord).toBe('testing')
  })

  it('should memoize results and only recalculate when notes change', () => {
    const notes = createMockNotes(3)
    mockUseNotes.mockReturnValue({
      data: notes,
      isLoading: false,
      error: null,
      isSuccess: true,
      isError: false,
    } as any)

    const { result, rerender } = renderHook(() => useNotesStats(), {
      wrapper: createWrapper,
    })

    const firstStats = result.current.stats
    const firstChartData = result.current.chartData

    // Rerender without changing notes
    rerender()

    // Should be the same objects due to memoization
    expect(result.current.stats).toBe(firstStats)
    expect(result.current.chartData).toBe(firstChartData)
  })
})