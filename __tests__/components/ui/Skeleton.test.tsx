import React from 'react'
import { render, screen } from '../../utils/test-utils'
import Skeleton from '@/components/ui/Skeleton'

describe('Skeleton Component', () => {
  it('renders with default styles', () => {
    render(<Skeleton data-testid="skeleton" />)
    
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveClass(
      'animate-pulse',
      'bg-gray-200',
      'dark:bg-gray-600',
      'rounded'
    )
  })

  it('applies custom className', () => {
    render(<Skeleton className="w-full h-4" data-testid="skeleton" />)
    
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toHaveClass('w-full', 'h-4')
    expect(skeleton).toHaveClass('animate-pulse') // base classes still applied
  })

  it('forwards HTML div props', () => {
    render(
      <Skeleton 
        data-testid="skeleton" 
        id="test-skeleton"
        role="presentation"
      />
    )
    
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toHaveAttribute('id', 'test-skeleton')
    expect(skeleton).toHaveAttribute('role', 'presentation')
  })

  it('handles multiple custom classes correctly', () => {
    render(
      <Skeleton 
        className="w-20 h-6 mb-2 mx-auto" 
        data-testid="skeleton" 
      />
    )
    
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toHaveClass(
      'animate-pulse',
      'bg-gray-200', 
      'dark:bg-gray-600',
      'rounded',
      'w-20',
      'h-6', 
      'mb-2',
      'mx-auto'
    )
  })

  it('renders as a div element', () => {
    render(<Skeleton data-testid="skeleton" />)
    
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton.tagName).toBe('DIV')
  })

  it('handles empty className prop', () => {
    render(<Skeleton className="" data-testid="skeleton" />)
    
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toHaveClass(
      'animate-pulse',
      'bg-gray-200',
      'dark:bg-gray-600', 
      'rounded'
    )
  })

  it('handles style prop', () => {
    render(
      <Skeleton 
        style={{ width: '100px', height: '20px' }}
        data-testid="skeleton"
      />
    )
    
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toHaveStyle({ width: '100px', height: '20px' })
  })

  it('supports event handlers', () => {
    const handleClick = jest.fn()
    render(
      <Skeleton 
        onClick={handleClick}
        data-testid="skeleton"
      />
    )
    
    const skeleton = screen.getByTestId('skeleton')
    skeleton.click()
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})