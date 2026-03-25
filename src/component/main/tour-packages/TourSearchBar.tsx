'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

export default function TourSearchBar({ initialQuery = '' }: { initialQuery?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(initialQuery)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Keep input in sync if URL changes externally (e.g. back button)
  useEffect(() => {
    setQuery(searchParams.get('search') ?? '')
  }, [searchParams])

  const pushSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value.trim()) {
      params.set('search', value.trim())
    } else {
      params.delete('search')
    }
    // Reset to page 1 on new search
    params.delete('page')
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => pushSearch(val), 400)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (debounceRef.current) clearTimeout(debounceRef.current)
    pushSearch(query)
  }

  const handleClear = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    setQuery('')
    pushSearch('')
    inputRef.current?.focus()
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      style={{
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        padding: '20px 24px',
        marginBottom: '32px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          border: '1.5px solid #e8e8e8',
          borderRadius: '8px',
          padding: '0 16px',
          transition: 'border-color 0.2s',
        }}
        onFocus={() => {}}
      >
        <i
          className="fa-regular fa-magnifying-glass"
          style={{ color: '#aaa', fontSize: '18px', flexShrink: 0 }}
        />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={handleChange}
          placeholder="Search tour packages by name..."
          aria-label="Search tour packages"
          autoComplete="off"
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '15px',
            padding: '14px 0',
            background: 'transparent',
            color: '#333',
          }}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#aaa',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <i className="fas fa-times" style={{ fontSize: '14px' }} />
          </button>
        )}
        <button
          type="submit"
          className="theme-btn"
          style={{ flexShrink: 0, padding: '10px 24px', fontSize: '14px' }}
        >
          Search
        </button>
      </div>
    </form>
  )
}
