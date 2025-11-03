import React from 'react'
import { BookItemProps } from '../types'

export default function BookItem({ book, onDelete, onToggleStatus }: BookItemProps) {
  return (
    <div className={`book-item ${book.status === 'Lido' ? 'read' : ''}`}>
      <div className="book-info">
        <h3>{book.title}</h3>
        <p className="author">{book.author}</p>
        <p className="status">Status: <strong>{book.status}</strong></p>
      </div>
      <div className="actions">
        {onToggleStatus && (
          <button
            className="btn toggle"
            onClick={() => onToggleStatus(book)}
            title="Alternar status"
          >
            {book.status === 'Lido' ? 'Marcar como Não lido' : 'Marcar como Lido'}
          </button>
        )}
        <button
          className="btn delete"
          onClick={() => book._id && onDelete(book._id)}
        >
          Remover
        </button>
      </div>
    </div>
  )
}
