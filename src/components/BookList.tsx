import React from 'react'
import { BookListProps } from '../types'
import BookItem from './BookItem'

export default function BookList({ books, onDelete, onToggleStatus }: BookListProps) {
  if (books.length === 0) return <div className="empty">Nenhum livro cadastrado. Use o formulário ao lado para adicionar o primeiro livro.</div>
  return (
    <div className="book-list">
      {books.map((b) => (
        <BookItem key={b._id || `${b.title}-${b.author}`} book={b} onDelete={onDelete} onToggleStatus={onToggleStatus} />
      ))}
    </div>
  )
}
