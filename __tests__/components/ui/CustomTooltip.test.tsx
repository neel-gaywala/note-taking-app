import React from 'react'
import { render, screen } from '../../utils/test-utils'
import CustomTooltip from '@/components/ui/CustomTooltip'

describe('CustomTooltip Component', () => {
  const mockPayload = [{ value: 5 }]
  const mockLabel = '2024-01-15'

  it('renders tooltip content when active with valid data', () => {
    render(
      <CustomTooltip 
        active={true}
        payload={mockPayload}
        label={mockLabel}
      />
    )

    expect(screen.getByText('Dec 25')).toBeInTheDocument() // Mocked date format
    expect(screen.getByText('5 notes created')).toBeInTheDocument()
  })

  it('renders singular "note" when count is 1', () => {
    const singlePayload = [{ value: 1 }]
    
    render(
      <CustomTooltip 
        active={true}
        payload={singlePayload}
        label={mockLabel}
      />
    )

    expect(screen.getByText('1 note created')).toBeInTheDocument()
  })

  it('renders plural "notes" when count is greater than 1', () => {
    const multiplePayload = [{ value: 3 }]
    
    render(
      <CustomTooltip 
        active={true}
        payload={multiplePayload}
        label={mockLabel}
      />
    )

    expect(screen.getByText('3 notes created')).toBeInTheDocument()
  })

  it('returns null when not active', () => {
    const { container } = render(
      <CustomTooltip 
        active={false}
        payload={mockPayload}
        label={mockLabel}
      />
    )

    expect(container.firstChild).toBeNull()
  })

  it('returns null when payload is undefined', () => {
    const { container } = render(
      <CustomTooltip 
        active={true}
        payload={undefined}
        label={mockLabel}
      />
    )

    expect(container.firstChild).toBeNull()
  })

  it('returns null when payload is empty', () => {
    const { container } = render(
      <CustomTooltip 
        active={true}
        payload={[]}
        label={mockLabel}
      />
    )

    expect(container.firstChild).toBeNull()
  })

  it('handles empty label gracefully', () => {
    render(
      <CustomTooltip 
        active={true}
        payload={mockPayload}
        label=""
      />
    )

    expect(screen.getByText('Dec 25')).toBeInTheDocument() // Mocked format handles empty string
    expect(screen.getByText('5 notes created')).toBeInTheDocument()
  })

  it('handles undefined label gracefully', () => {
    render(
      <CustomTooltip 
        active={true}
        payload={mockPayload}
        label={undefined}
      />
    )

    expect(screen.getByText('Dec 25')).toBeInTheDocument() // Mocked format handles undefined
    expect(screen.getByText('5 notes created')).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    render(
      <CustomTooltip 
        active={true}
        payload={mockPayload}
        label={mockLabel}
      />
    )

    const tooltipContainer = screen.getByText('Dec 25').closest('div')
    expect(tooltipContainer).toHaveClass(
      'bg-white',
      'p-3',
      'rounded-lg',
      'shadow-lg',
      'border'
    )

    const dateElement = screen.getByText('Dec 25')
    expect(dateElement).toHaveClass(
      'text-sm',
      'font-medium',
      'text-gray-900'
    )

    const countElement = screen.getByText('5 notes created')
    expect(countElement).toHaveClass(
      'text-sm',
      'text-gray-600'
    )
  })

  it('handles zero count', () => {
    const zeroPayload = [{ value: 0 }]
    
    render(
      <CustomTooltip 
        active={true}
        payload={zeroPayload}
        label={mockLabel}
      />
    )

    expect(screen.getByText('0 notes created')).toBeInTheDocument()
  })

  it('renders with different date formats', () => {
    const dates = ['2024-12-01', '2024-01-01', '2023-06-15']
    
    dates.forEach((date, index) => {
      const { unmount } = render(
        <CustomTooltip 
          active={true}
          payload={mockPayload}
          label={date}
        />
      )

      expect(screen.getByText('Dec 25')).toBeInTheDocument() // All dates mocked to same format
      
      unmount()
    })
  })

  it('handles large count numbers', () => {
    const largePayload = [{ value: 999 }]
    
    render(
      <CustomTooltip 
        active={true}
        payload={largePayload}
        label={mockLabel}
      />
    )

    expect(screen.getByText('999 notes created')).toBeInTheDocument()
  })
})