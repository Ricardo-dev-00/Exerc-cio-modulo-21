export type ReadingStatus = 'Lido' | 'Não lido'

export interface Book {
  _id?: string
  title: string
  author: string
  status: ReadingStatus
}

// Props
export interface BookItemProps {
  book: Book
  onDelete: (id: string) => void
  onToggleStatus?: (book: Book) => void
}

export interface BookListProps {
  books: Book[]
  onDelete: (id: string) => void
  onToggleStatus?: (book: Book) => void
}

export interface BookFormProps {
  onAdd: (book: Omit<Book, '_id'>) => void
}
