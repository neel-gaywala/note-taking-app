import React from 'react'
import { render, screen } from '../../utils/test-utils'
import NoteCardSkeleton from '@/components/ui/NoteCardSkeleton'

describe('NoteCardSkeleton Component', () => {
  it('renders skeleton structure correctly', () => {
    const { container } = render(<NoteCardSkeleton />)
    
    // Check main container structure
    const mainContainer = container.firstChild
    expect(mainContainer).toHaveClass(
      'bg-white',
      'dark:bg-gray-800',
      'rounded-lg', 
      'border',
      'border-gray-200',
      'dark:border-gray-700',
      'p-4'
    )
  })

  it('renders title skeleton', () => {
    const { container } = render(<NoteCardSkeleton />)
    
    // Find the title skeleton (first skeleton element with h-6)
    const titleSkeleton = container.querySelector('.h-6.mb-3')
    expect(titleSkeleton).toBeInTheDocument()
    expect(titleSkeleton).toHaveClass('h-6', 'mb-3')
  })

  it('renders content skeleton lines', () => {
    const { container } = render(<NoteCardSkeleton />)
    
    // Check for content area
    const contentArea = container.querySelector('.space-y-2')
    expect(contentArea).toBeInTheDocument()
    
    // Check for three content lines with different widths
    const contentLines = contentArea?.querySelectorAll('.h-4')
    expect(contentLines).toHaveLength(3)
    
    // Check specific width classes
    expect(contentLines?.[0]).toHaveClass('h-4')
    expect(contentLines?.[1]).toHaveClass('h-4', 'w-3/4')
    expect(contentLines?.[2]).toHaveClass('h-4', 'w-1/2')
  })

  it('renders footer section with date and action buttons', () => {
    const { container } = render(<NoteCardSkeleton />)
    
    // Check footer container
    const footer = container.querySelector('.flex.justify-between.items-center.mt-4.pt-4')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveClass(
      'border-t',
      'border-gray-100',
      'dark:border-gray-700'
    )
    
    // Check date skeleton
    const dateSkeleton = footer?.querySelector('.h-3.w-20')
    expect(dateSkeleton).toBeInTheDocument()
    
    // Check action buttons area
    const actionsContainer = footer?.querySelector('.flex.space-x-2')
    expect(actionsContainer).toBeInTheDocument()
    
    // Check for two action button skeletons
    const actionButtons = actionsContainer?.querySelectorAll('.h-6.w-6')
    expect(actionButtons).toHaveLength(2)
  })

  it('has proper skeleton animation classes', () => {
    const { container } = render(<NoteCardSkeleton />)
    
    // All skeleton elements should have animation classes
    const skeletonElements = container.querySelectorAll('[class*="bg-gray-200"],[class*="dark:bg-gray-600"]')
    
    // Should have at least 6 skeleton elements (title, 3 content lines, date, 2 buttons)
    expect(skeletonElements.length).toBeGreaterThanOrEqual(6)
  })

  it('maintains proper spacing and layout', () => {
    const { container } = render(<NoteCardSkeleton />)
    
    // Check vertical spacing between sections
    const titleArea = container.querySelector('.h-6.mb-3')
    expect(titleArea).toHaveClass('mb-3')
    
    const contentArea = container.querySelector('.space-y-2')
    expect(contentArea).toHaveClass('space-y-2')
    
    const footer = container.querySelector('.mt-4.pt-4')
    expect(footer).toHaveClass('mt-4', 'pt-4')
    
    // Check horizontal spacing in footer
    const actionsContainer = container.querySelector('.flex.space-x-2')
    expect(actionsContainer).toHaveClass('space-x-2')
  })

  it('renders consistently on multiple calls', () => {
    const { container: container1 } = render(<NoteCardSkeleton />)
    const { container: container2 } = render(<NoteCardSkeleton />)
    
    // Both should have the same structure
    expect(container1.innerHTML).toBe(container2.innerHTML)
  })

  it('matches NoteCard visual structure', () => {
    const { container } = render(<NoteCardSkeleton />)
    
    // Should have same basic layout as NoteCard:
    // - Main container with padding and border
    // - Title area
    // - Content area with multiple lines
    // - Footer with date and actions
    
    const mainContainer = container.firstChild
    expect(mainContainer).toHaveClass('p-4', 'rounded-lg', 'border')
    
    // Check for proper semantic structure
    const sections = [
      container.querySelector('.h-6.mb-3'), // title
      container.querySelector('.space-y-2'), // content  
      container.querySelector('.mt-4.pt-4.border-t') // footer
    ]
    
    sections.forEach(section => {
      expect(section).toBeInTheDocument()
    })
  })

  it('has dark mode support classes', () => {
    const { container } = render(<NoteCardSkeleton />)
    
    const mainContainer = container.firstChild
    expect(mainContainer).toHaveClass('dark:bg-gray-800', 'dark:border-gray-700')
    
    const footer = container.querySelector('.border-t')
    expect(footer).toHaveClass('dark:border-gray-700')
  })
})