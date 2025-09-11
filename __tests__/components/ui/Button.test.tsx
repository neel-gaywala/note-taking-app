import React from 'react'
import { render, screen, fireEvent } from '../../utils/test-utils'
import Button from '@/components/ui/Button'

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-blue-600') // primary variant
    expect(button).toHaveClass('text-sm') // medium size
  })

  it('renders with different variants', () => {
    render(
      <div>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    )

    expect(screen.getByText('Primary')).toHaveClass('bg-blue-600')
    expect(screen.getByText('Secondary')).toHaveClass('bg-gray-200')
    expect(screen.getByText('Danger')).toHaveClass('bg-red-600')
    expect(screen.getByText('Ghost')).toHaveClass('bg-transparent')
  })

  it('renders with different sizes', () => {
    render(
      <div>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    )

    expect(screen.getByText('Small')).toHaveClass('text-sm', 'px-3', 'py-1.5')
    expect(screen.getByText('Medium')).toHaveClass('text-sm', 'px-4', 'py-2')
    expect(screen.getByText('Large')).toHaveClass('text-base', 'px-6', 'py-3')
  })

  it('shows loading state correctly', () => {
    render(<Button isLoading>Loading Button</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.queryByText('Loading Button')).not.toBeInTheDocument()
    
    // Check for loading spinner
    const spinner = button.querySelector('svg')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('animate-spin')
  })

  it('handles disabled state', () => {
    render(<Button disabled>Disabled Button</Button>)
    
    const button = screen.getByRole('button', { name: /disabled button/i })
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed')
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    fireEvent.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn()
    render(
      <Button onClick={handleClick} disabled>
        Disabled Button
      </Button>
    )
    
    const button = screen.getByRole('button', { name: /disabled button/i })
    fireEvent.click(button)
    
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('does not call onClick when loading', () => {
    const handleClick = jest.fn()
    render(
      <Button onClick={handleClick} isLoading>
        Loading Button
      </Button>
    )
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>)
    
    const button = screen.getByRole('button', { name: /custom button/i })
    expect(button).toHaveClass('custom-class')
  })

  it('forwards HTML button props', () => {
    render(
      <Button type="submit" data-testid="submit-btn">
        Submit
      </Button>
    )
    
    const button = screen.getByTestId('submit-btn')
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('has proper accessibility attributes', () => {
    render(<Button aria-label="Accessible button">Click</Button>)
    
    const button = screen.getByRole('button', { name: /accessible button/i })
    expect(button).toHaveAttribute('aria-label', 'Accessible button')
  })

  it('maintains focus behavior', () => {
    render(<Button>Focusable Button</Button>)
    
    const button = screen.getByRole('button', { name: /focusable button/i })
    button.focus()
    
    expect(button).toHaveFocus()
    expect(button).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2')
  })
})