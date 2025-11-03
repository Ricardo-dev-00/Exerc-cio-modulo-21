import axios from 'axios'
import { Book } from './types'

const BASE = import.meta.env.VITE_CRUDCRUD_BASE as string
const BUILD_USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

// runtime override: allows toggling mock on/off without rebuilding
let runtimeUseMock = false

export function setRuntimeUseMock(value: boolean) {
  runtimeUseMock = value
}

export function getRuntimeUseMock(): boolean {
  return runtimeUseMock
}

const USE_MOCK = BUILD_USE_MOCK || runtimeUseMock

if (!BASE && !BUILD_USE_MOCK) {
  console.warn('VITE_CRUDCRUD_BASE não está configurado e VITE_USE_MOCK não está ativado. Configure em .env para conectar à API do crudcrud.com ou ative o mock.')
}

const api = axios.create({
  baseURL: BASE || '',
  headers: { 'Content-Type': 'application/json' }
})

// Local mock using localStorage for fast development when VITE_USE_MOCK=true
function readMock(): Book[] {
  try {
    const raw = localStorage.getItem('books')
    return raw ? JSON.parse(raw) as Book[] : []
  } catch {
    return []
  }
}

function writeMock(items: Book[]) {
  try {
    localStorage.setItem('books', JSON.stringify(items))
  } catch {
    // ignore
  }
}

export async function getBooks(): Promise<Book[]> {
  // check runtime override as well
  const activeMock = BUILD_USE_MOCK || runtimeUseMock
  if (activeMock) {
    return Promise.resolve(readMock())
  }
  const resp = await api.get('/')
  return resp.data as Book[]
}

export async function createBook(book: Omit<Book, '_id'>): Promise<Book> {
  const activeMock = BUILD_USE_MOCK || runtimeUseMock
  if (activeMock) {
    const items = readMock()
    const _id = Date.now().toString()
    const created: Book = { ...book, _id }
    items.push(created)
    writeMock(items)
    return Promise.resolve(created)
  }
  const resp = await api.post('/', book)
  return resp.data as Book
}

export async function deleteBook(id: string): Promise<void> {
  const activeMock = BUILD_USE_MOCK || runtimeUseMock
  if (activeMock) {
    const items = readMock().filter((b) => b._id !== id)
    writeMock(items)
    return Promise.resolve()
  }
  await api.delete('/' + id)
}

export async function updateBook(book: Book): Promise<Book> {
  if (!book._id) throw new Error('Book must have _id to update')
  const activeMock = BUILD_USE_MOCK || runtimeUseMock
  if (activeMock) {
    const items = readMock()
    const idx = items.findIndex((b) => b._id === book._id)
    if (idx >= 0) {
      items[idx] = { ...book }
      writeMock(items)
      return Promise.resolve(items[idx])
    }
    throw new Error('Book not found')
  }
  const id = book._id
  const payload = { title: book.title, author: book.author, status: book.status }
  const resp = await api.put('/' + id, payload)
  return resp.data as Book
}
