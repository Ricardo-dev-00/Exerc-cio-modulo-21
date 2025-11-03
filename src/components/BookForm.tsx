import React, { useState } from 'react'
import { BookFormProps, ReadingStatus } from '../types'

export default function BookForm({ onAdd }: BookFormProps) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [status, setStatus] = useState<ReadingStatus>('Não lido')
  const [loading, setLoading] = useState(false)

  function reset() {
    setTitle('')
    setAuthor('')
    setStatus('Não lido')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !author.trim()) return
    setLoading(true)
    try {
      await onAdd({ title: title.trim(), author: author.trim(), status })
      reset()
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Título</label>
        <input id="title" placeholder="O nome do livro" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="field">
        <label htmlFor="author">Autor</label>
        <input id="author" placeholder="Nome do autor" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      </div>
      <div className="field">
        <label htmlFor="status">Status</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value as ReadingStatus)}>
          <option>Não lido</option>
          <option>Lido</option>
        </select>
      </div>
      <div className="field actions">
        <button className="btn primary" type="submit" disabled={loading}>{loading ? 'Adicionando...' : 'Adicionar Livro'}</button>
      </div>
    </form>
  )
}
