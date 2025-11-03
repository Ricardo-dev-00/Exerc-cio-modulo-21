import React, { useEffect, useState } from 'react'
import { Book } from './types'
import { getBooks, createBook, deleteBook, updateBook } from './api'
import { setRuntimeUseMock } from './api'
import BookList from './components/BookList'
import BookForm from './components/BookForm'

export default function App() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [useMock, setUseMock] = useState<boolean>(false)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const data = await getBooks()
      setBooks(data)
    } catch (err: any) {
      setError(err?.message || 'Erro ao carregar livros')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // carregar preferencia de mock do localStorage (persistente em runtime)
    const saved = localStorage.getItem('useMock')
    const initial = saved ? saved === 'true' : false
    setUseMock(initial)
    setRuntimeUseMock(initial)
  }, [])

  const handleAdd = async (bookData: Omit<Book, '_id'>) => {
    try {
      const created = await createBook(bookData)
      setBooks((s) => [...s, created])
    } catch (err: any) {
      alert('Erro ao adicionar livro: ' + (err?.message || 'Unknown'))
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Remover este livro?')) return
    try {
      await deleteBook(id)
      setBooks((s) => s.filter((b) => b._id !== id))
    } catch (err: any) {
      alert('Erro ao remover: ' + (err?.message || 'Unknown'))
    }
  }

  const handleToggleStatus = async (book: Book) => {
    const updated = { ...book, status: book.status === 'Lido' ? 'Não lido' : 'Lido' }
    try {
      const resp = await updateBook(updated)
      // crudcrud PUT returns the saved object (sem _id), dependendo do endpoint; garantir que o id seja preservado
      const withId = { ...resp, _id: book._id }
      setBooks((s) => s.map((b) => (b._id === book._id ? withId : b)))
    } catch (err: any) {
      alert('Erro ao atualizar status: ' + (err?.message || 'Unknown'))
    }
  }
  return (
    <div className="container">
      <header>
        <div>
          <h1>Catálogo de Livros</h1>
          <div className="meta">Organize seus livros — adicione, marque como lido e remova</div>
        </div>

        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div className="mock-control">
            <label className="mock-label">Modo mock</label>
            <button
              className={`btn toggle ${useMock ? 'active' : ''}`}
              onClick={() => {
                const next = !useMock
                setUseMock(next)
                localStorage.setItem('useMock', next ? 'true' : 'false')
                setRuntimeUseMock(next)
              }}
            >
              {useMock ? 'Mock: ON' : 'Mock: OFF'}
            </button>
          </div>

          {useMock && (
            <button
              className="btn secondary"
              onClick={() => {
                if (!confirm('Limpar dados mock (localStorage)?')) return
                localStorage.removeItem('books')
                setBooks([])
              }}
            >
              Limpar mock
            </button>
          )}

          <div className="mock-badge" aria-hidden>{useMock ? 'USANDO MOCK' : ''}</div>
        </div>
      </header>

      <main>
        <section className="left">
          <div className="card book-form">
            <h2>Adicionar livro</h2>
            <BookForm onAdd={handleAdd} />
          </div>
        </section>

        <section className="right">
          <div className="card">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
              <h2 style={{margin:0}}>Livros</h2>
              <div className="meta">{books.length} {books.length === 1 ? 'livro' : 'livros'}</div>
            </div>

            {loading && <p>Carregando...</p>}
            {error && <p className="error">{error}</p>}

            <BookList books={books} onDelete={handleDelete} onToggleStatus={handleToggleStatus} />
          </div>
        </section>
      </main>

      
    </div>
  )
}
