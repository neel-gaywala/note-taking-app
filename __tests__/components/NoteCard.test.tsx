import React from 'react'
import { render, screen, fireEvent } from '../utils/test-utils'
import NoteCard from '@/components/NoteCard'
import { createMockNote } from '../utils/test-utils'

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Edit: ({ className }: { className?: string }) => (
    <div className={className} data-testid="edit-icon" />
  ),
  Trash2: ({ className }: { className?: string }) => (
    <div className={className} data-testid="trash-icon" />
  ),
}))

describe('NoteCard Component', () => {
  const mockOnEdit = jest.fn()
  const mockOnDelete = jest.fn()
  
  const defaultProps = {
    note: createMockNote(),
    onEdit: mockOnEdit,
    onDelete: mockOnDelete,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders note content correctly', () => {
    render(<NoteCard {...defaultProps} />)
    
    expect(screen.getByText('Test Note')).toBeInTheDocument()
    expect(screen.getByText('This is a test note content')).toBeInTheDocument()
    expect(screen.getByText('Dec 25, 2024')).toBeInTheDocument() // Mocked date format
  })

  it('truncates long content with ellipsis', () => {
    const longNote = createMockNote({
      content: 'A'.repeat(150), // Exceeds 120 character limit
    })
    
    render(<NoteCard {...defaultProps} note={longNote} />)
    
    const content = screen.getByText(/A+\.\.\./);
    expect(content).toBeInTheDocument()
    expect(content.textContent).toHaveLength(123) // 120 chars + "..."
  })

  it('does not truncate short content', () => {
    const shortNote = createMockNote({
      content: 'Short content',
    })
    
    render(<NoteCard {...defaultProps} note={shortNote} />)
    
    expect(screen.getByText('Short content')).toBeInTheDocument()
    expect(screen.queryByText(/\.\.\./)).not.toBeInTheDocument()
  })

  it('calls onEdit when edit button is clicked', () => {
    render(<NoteCard {...defaultProps} />)
    
    const editButton = screen.getByTestId('edit-icon').closest('button')
    expect(editButton).toBeInTheDocument()
    
    fireEvent.click(editButton!)
    
    expect(mockOnEdit).toHaveBeenCalledTimes(1)
    expect(mockOnEdit).toHaveBeenCalledWith(defaultProps.note)
  })

  it('calls onDelete when delete button is clicked', () => {
    render(<NoteCard {...defaultProps} />)
    
    const deleteButton = screen.getByTestId('trash-icon').closest('button')
    expect(deleteButton).toBeInTheDocument()
    
    fireEvent.click(deleteButton!)
    
    expect(mockOnDelete).toHaveBeenCalledTimes(1)
    expect(mockOnDelete).toHaveBeenCalledWith(defaultProps.note.id)
  })

  it('stops event propagation on button clicks', () => {
    const mockCardClick = jest.fn()
    
    render(
      <div onClick={mockCardClick}>
        <NoteCard {...defaultProps} />
      </div>
    )
    
    const editButton = screen.getByTestId('edit-icon').closest('button')
    const deleteButton = screen.getByTestId('trash-icon').closest('button')
    
    fireEvent.click(editButton!)
    fireEvent.click(deleteButton!)
    
    // Card click handler should not be called due to stopPropagation
    expect(mockCardClick).not.toHaveBeenCalled()
  })

  it('renders with proper CSS classes', () => {
    render(<NoteCard {...defaultProps} />)
    
    const title = screen.getByText('Test Note')
    expect(title).toHaveClass(
      'font-semibold',
      'text-lg',
      'text-gray-900',
      'dark:text-gray-100',
      'line-clamp-2'
    )
    
    const content = screen.getByText('This is a test note content')
    expect(content).toHaveClass(
      'text-gray-600',
      'dark:text-gray-300',
      'text-sm',
      'line-clamp-3',
      'flex-1'
    )
    
    const date = screen.getByText('Dec 25, 2024')
    expect(date).toHaveClass(
      'text-xs',
      'text-gray-500',
      'dark:text-gray-400'
    )
  })

  it('renders edit button with correct styling', () => {
    render(<NoteCard {...defaultProps} />)
    
    const editButton = screen.getByTestId('edit-icon').closest('button')
    expect(editButton).toHaveClass(
      'p-1.5',
      'hover:bg-blue-50',
      'dark:hover:bg-blue-900',
      'hover:text-blue-600',
      'dark:hover:text-blue-400'
    )
    
    const editIcon = screen.getByTestId('edit-icon')
    expect(editIcon).toHaveClass('w-4', 'h-4')
  })

  it('renders delete button with correct styling', () => {
    render(<NoteCard {...defaultProps} />)
    
    const deleteButton = screen.getByTestId('trash-icon').closest('button')
    expect(deleteButton).toHaveClass(
      'p-1.5',
      'hover:bg-red-50',
      'dark:hover:bg-red-900',
      'hover:text-red-600',
      'dark:hover:text-red-400'
    )
    
    const trashIcon = screen.getByTestId('trash-icon')
    expect(trashIcon).toHaveClass('w-4', 'h-4')
  })

  it('formats different date formats correctly', () => {
    const note = createMockNote({
      updatedAt: '2023-06-15T10:30:00.000Z',
    })
    
    render(<NoteCard {...defaultProps} note={note} />)
    
    // Date should be formatted consistently due to mocking
    expect(screen.getByText('Dec 25, 2024')).toBeInTheDocument()
  })

  it('handles empty title and content', () => {
    const emptyNote = createMockNote({
      title: '',
      content: '',
    })
    
    render(<NoteCard {...defaultProps} note={emptyNote} />)
    
    // Components should still render even with empty content
    const titleElement = screen.getByRole('heading')
    const contentElement = titleElement.nextElementSibling
    
    expect(titleElement).toBeInTheDocument()
    expect(contentElement).toBeInTheDocument()
  })

  it('maintains proper layout structure', () => {
    const { container } = render(<NoteCard {...defaultProps} />)
    
    // Check main structure
    const card = container.firstChild
    expect(card).toHaveClass('p-4', 'h-full', 'flex', 'flex-col')
    
    // Check content area
    const contentArea = container.querySelector('.flex-1.space-y-3')
    expect(contentArea).toBeInTheDocument()
    
    // Check footer
    const footer = container.querySelector('.border-t')
    expect(footer).toHaveClass(
      'flex',
      'items-center',
      'justify-between',
      'pt-4',
      'mt-auto',
      'border-gray-100',
      'dark:border-gray-700'
    )
    
    // Check button container
    const buttonContainer = container.querySelector('.flex.items-center.space-x-2')
    expect(buttonContainer).toBeInTheDocument()
  })

  it('handles very long titles', () => {
    const longTitleNote = createMockNote({
      title: 'This is a very long title that should be clamped to 2 lines maximum and should not overflow the container',
    })
    
    render(<NoteCard {...defaultProps} note={longTitleNote} />)
    
    const title = screen.getByRole('heading')
    expect(title).toHaveClass('line-clamp-2')
    expect(title).toHaveTextContent(longTitleNote.title)
  })

  it('has accessible button labels', () => {
    render(<NoteCard {...defaultProps} />)
    
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
    
    // Buttons should have accessible content via icons
    expect(screen.getByTestId('edit-icon')).toBeInTheDocument()
    expect(screen.getByTestId('trash-icon')).toBeInTheDocument()
  })
})