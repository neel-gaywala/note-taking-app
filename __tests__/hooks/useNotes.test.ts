import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import {
  useNotes,
  useNote,
  useCreateNote,
  useUpdateNote,
  useDeleteNote,
} from '@/hooks/useNotes'
import { createMockNote, createMockNotes, mockApiResponse, mockApiError } from '../utils/test-utils'

// Mock fetch globally
const mockFetch = jest.fn()
global.fetch = mockFetch

describe('useNotes Hooks', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: 0,
          gcTime: 0,
        },
        mutations: {
          retry: false,
        },
      },
    })
    jest.clearAllMocks()
  })

  const createWrapper = ({ children }: { children: React.ReactNode }) => {
    return React.createElement(QueryClientProvider, { client: queryClient }, children)
  }

  describe('useNotes', () => {
    it('should fetch notes successfully', async () => {
      const mockNotes = createMockNotes(3)
      mockFetch.mockResolvedValueOnce(mockApiResponse(mockNotes))

      const { result } = renderHook(() => useNotes(), {
        wrapper: createWrapper,
      })

      expect(result.current.isLoading).toBe(true)
      expect(result.current.data).toBeUndefined()

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.isSuccess).toBe(true)
      expect(result.current.data).toEqual(mockNotes)
      expect(mockFetch).toHaveBeenCalledWith('/api/notes')
    })

    it('should handle fetch error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Failed to fetch notes'))

      const { result } = renderHook(() => useNotes(), {
        wrapper: createWrapper,
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.isError).toBe(true)
      expect(result.current.error).toEqual(new Error('Failed to fetch notes'))
    })

    it('should handle non-ok response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      })

      const { result } = renderHook(() => useNotes(), {
        wrapper: createWrapper,
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.isError).toBe(true)
    })
  })

  describe('useNote', () => {
    it('should fetch single note successfully', async () => {
      const mockNote = createMockNote({ id: 1 })
      mockFetch.mockResolvedValueOnce(mockApiResponse(mockNote))

      const { result } = renderHook(() => useNote(1), {
        wrapper: createWrapper,
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.isSuccess).toBe(true)
      expect(result.current.data).toEqual(mockNote)
      expect(mockFetch).toHaveBeenCalledWith('/api/notes/1')
    })

    it('should not fetch when id is falsy', () => {
      const { result } = renderHook(() => useNote(0), {
        wrapper: createWrapper,
      })

      expect(result.current.fetchStatus).toBe('idle')
      expect(mockFetch).not.toHaveBeenCalled()
    })

    it('should handle fetch single note error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Failed to fetch note'))

      const { result } = renderHook(() => useNote(1), {
        wrapper: createWrapper,
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.isError).toBe(true)
      expect(result.current.error).toEqual(new Error('Failed to fetch note'))
    })
  })

  describe('useCreateNote', () => {
    it('should create note successfully', async () => {
      const newNote = createMockNote({ id: 4 })
      const createRequest = { title: newNote.title, content: newNote.content }
      
      mockFetch.mockResolvedValueOnce(mockApiResponse(newNote))

      const { result } = renderHook(() => useCreateNote(), {
        wrapper: createWrapper,
      })

      expect(result.current.isPending).toBe(false)

      result.current.mutate(createRequest)

      await waitFor(() => {
        expect(result.current.isPending).toBe(false)
      })

      expect(result.current.isSuccess).toBe(true)
      expect(result.current.data).toEqual(newNote)
      expect(mockFetch).toHaveBeenCalledWith('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createRequest),
      })
    })

    it('should handle create note error', async () => {
      const createRequest = { title: 'Test', content: 'Test content' }
      mockFetch.mockRejectedValueOnce(new Error('Failed to create note'))

      const { result } = renderHook(() => useCreateNote(), {
        wrapper: createWrapper,
      })

      result.current.mutate(createRequest)

      await waitFor(() => {
        expect(result.current.isPending).toBe(false)
      })

      expect(result.current.isError).toBe(true)
      expect(result.current.error).toEqual(new Error('Failed to create note'))
    })

    it('should invalidate notes query on success', async () => {
      const newNote = createMockNote({ id: 4 })
      const createRequest = { title: newNote.title, content: newNote.content }
      
      mockFetch.mockResolvedValueOnce(mockApiResponse(newNote))
      
      const invalidateQueriesSpy = jest.spyOn(queryClient, 'invalidateQueries')

      const { result } = renderHook(() => useCreateNote(), {
        wrapper: createWrapper,
      })

      result.current.mutate(createRequest)

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true)
      })

      expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['notes'] })
    })
  })

  describe('useUpdateNote', () => {
    it('should update note successfully', async () => {
      const updatedNote = createMockNote({ id: 1, title: 'Updated Title' })
      const updateRequest = { title: updatedNote.title, content: updatedNote.content }
      
      mockFetch.mockResolvedValueOnce(mockApiResponse(updatedNote))

      const { result } = renderHook(() => useUpdateNote(), {
        wrapper: createWrapper,
      })

      result.current.mutate({ id: 1, data: updateRequest })

      await waitFor(() => {
        expect(result.current.isPending).toBe(false)
      })

      expect(result.current.isSuccess).toBe(true)
      expect(result.current.data).toEqual(updatedNote)
      expect(mockFetch).toHaveBeenCalledWith('/api/notes/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateRequest),
      })
    })

    it('should handle update note error', async () => {
      const updateRequest = { title: 'Updated', content: 'Updated content' }
      mockFetch.mockRejectedValueOnce(new Error('Failed to update note'))

      const { result } = renderHook(() => useUpdateNote(), {
        wrapper: createWrapper,
      })

      result.current.mutate({ id: 1, data: updateRequest })

      await waitFor(() => {
        expect(result.current.isPending).toBe(false)
      })

      expect(result.current.isError).toBe(true)
      expect(result.current.error).toEqual(new Error('Failed to update note'))
    })

    it('should update query cache on success', async () => {
      const updatedNote = createMockNote({ id: 1, title: 'Updated Title' })
      const updateRequest = { title: updatedNote.title, content: updatedNote.content }
      
      mockFetch.mockResolvedValueOnce(mockApiResponse(updatedNote))
      
      const setQueryDataSpy = jest.spyOn(queryClient, 'setQueryData')
      const invalidateQueriesSpy = jest.spyOn(queryClient, 'invalidateQueries')

      const { result } = renderHook(() => useUpdateNote(), {
        wrapper: createWrapper,
      })

      result.current.mutate({ id: 1, data: updateRequest })

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true)
      })

      expect(setQueryDataSpy).toHaveBeenCalledWith(['notes', 1], updatedNote)
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['notes'] })
    })
  })

  describe('useDeleteNote', () => {
    it('should delete note successfully', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true })

      const { result } = renderHook(() => useDeleteNote(), {
        wrapper: createWrapper,
      })

      result.current.mutate(1)

      await waitFor(() => {
        expect(result.current.isPending).toBe(false)
      })

      expect(result.current.isSuccess).toBe(true)
      expect(mockFetch).toHaveBeenCalledWith('/api/notes/1', {
        method: 'DELETE',
      })
    })

    it('should handle delete note error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Failed to delete note'))

      const { result } = renderHook(() => useDeleteNote(), {
        wrapper: createWrapper,
      })

      result.current.mutate(1)

      await waitFor(() => {
        expect(result.current.isPending).toBe(false)
      })

      expect(result.current.isError).toBe(true)
      expect(result.current.error).toEqual(new Error('Failed to delete note'))
    })

    it('should remove query and invalidate on success', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true })
      
      const removeQueriesSpy = jest.spyOn(queryClient, 'removeQueries')
      const invalidateQueriesSpy = jest.spyOn(queryClient, 'invalidateQueries')

      const { result } = renderHook(() => useDeleteNote(), {
        wrapper: createWrapper,
      })

      result.current.mutate(1)

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true)
      })

      expect(removeQueriesSpy).toHaveBeenCalledWith({ queryKey: ['notes', 1] })
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['notes'] })
    })
  })

  describe('API error handling', () => {
    it('should handle non-200 status codes', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })

      const { result } = renderHook(() => useNote(999), {
        wrapper: createWrapper,
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.isError).toBe(true)
    })

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const { result } = renderHook(() => useNotes(), {
        wrapper: createWrapper,
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.isError).toBe(true)
      expect(result.current.error?.message).toBe('Network error')
    })
  })
})