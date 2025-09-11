import { renderHook, act } from '@testing-library/react'
import useDebounce from '@/hooks/useDebounce'

// Mock timers
jest.useFakeTimers()

describe('useDebounce Hook', () => {
  beforeEach(() => {
    jest.clearAllTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500))
    
    expect(result.current).toBe('initial')
  })

  it('should debounce value updates', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 }
      }
    )

    expect(result.current).toBe('initial')

    // Update value
    rerender({ value: 'updated', delay: 500 })
    
    // Value should not change immediately
    expect(result.current).toBe('initial')
    
    // Fast forward time but not enough for debounce
    act(() => {
      jest.advanceTimersByTime(300)
    })
    
    expect(result.current).toBe('initial')
    
    // Fast forward past debounce delay
    act(() => {
      jest.advanceTimersByTime(200)
    })
    
    expect(result.current).toBe('updated')
  })

  it('should reset timer on rapid value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: 'initial' }
      }
    )

    // First update
    rerender({ value: 'first' })
    
    // Advance time partially
    act(() => {
      jest.advanceTimersByTime(300)
    })
    
    expect(result.current).toBe('initial')
    
    // Second update before first completes
    rerender({ value: 'second' })
    
    // Advance time for original delay
    act(() => {
      jest.advanceTimersByTime(300)
    })
    
    // Should still have initial value
    expect(result.current).toBe('initial')
    
    // Complete the new delay
    act(() => {
      jest.advanceTimersByTime(200)
    })
    
    expect(result.current).toBe('second')
  })

  it('should handle different delay values', () => {
    const { result, rerender } = renderHook(
      ({ delay }) => useDebounce('test', delay),
      {
        initialProps: { delay: 100 }
      }
    )

    // Change delay
    rerender({ delay: 1000 })
    
    // Original shorter delay shouldn't trigger
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    expect(result.current).toBe('test')
    
    // New longer delay should trigger
    act(() => {
      jest.advanceTimersByTime(900)
    })
    
    expect(result.current).toBe('test')
  })

  it('should work with different data types', () => {
    // Test with numbers
    const { result: numberResult, rerender: numberRerender } = renderHook(
      ({ value }) => useDebounce(value, 100),
      {
        initialProps: { value: 0 }
      }
    )

    numberRerender({ value: 42 })
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    expect(numberResult.current).toBe(42)

    // Test with objects
    const initialObj = { id: 1, name: 'test' }
    const updatedObj = { id: 2, name: 'updated' }
    
    const { result: objectResult, rerender: objectRerender } = renderHook(
      ({ value }) => useDebounce(value, 100),
      {
        initialProps: { value: initialObj }
      }
    )

    objectRerender({ value: updatedObj })
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    expect(objectResult.current).toEqual(updatedObj)

    // Test with arrays
    const { result: arrayResult, rerender: arrayRerender } = renderHook(
      ({ value }) => useDebounce(value, 100),
      {
        initialProps: { value: [1, 2, 3] }
      }
    )

    arrayRerender({ value: [4, 5, 6] })
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    expect(arrayResult.current).toEqual([4, 5, 6])
  })

  it('should handle zero delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 0),
      {
        initialProps: { value: 'initial' }
      }
    )

    rerender({ value: 'updated' })
    
    // With zero delay, should update on next tick
    act(() => {
      jest.advanceTimersByTime(0)
    })
    
    expect(result.current).toBe('updated')
  })

  it('should cleanup timeout on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout')
    
    const { unmount, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: 'initial' }
      }
    )

    rerender({ value: 'updated' })
    
    // Unmount before timeout completes
    unmount()
    
    expect(clearTimeoutSpy).toHaveBeenCalled()
    
    clearTimeoutSpy.mockRestore()
  })

  it('should handle multiple rapid updates correctly', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      {
        initialProps: { value: 'v0' }
      }
    )

    // Simulate rapid typing
    const values = ['v1', 'v2', 'v3', 'v4', 'v5']
    
    values.forEach((value, index) => {
      rerender({ value })
      
      // Advance time slightly between updates
      act(() => {
        jest.advanceTimersByTime(50)
      })
    })
    
    // Should still be at initial value
    expect(result.current).toBe('v0')
    
    // Complete the debounce delay
    act(() => {
      jest.advanceTimersByTime(300)
    })
    
    // Should have the final value
    expect(result.current).toBe('v5')
  })

  it('should maintain referential equality for same values', () => {
    const sameObject = { test: 'value' }
    
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 100),
      {
        initialProps: { value: sameObject }
      }
    )

    expect(result.current).toBe(sameObject)
    
    // Update with same reference
    rerender({ value: sameObject })
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    expect(result.current).toBe(sameObject)
  })

  it('should handle boolean values', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 200),
      {
        initialProps: { value: false }
      }
    )

    expect(result.current).toBe(false)
    
    rerender({ value: true })
    
    act(() => {
      jest.advanceTimersByTime(200)
    })
    
    expect(result.current).toBe(true)
  })
})