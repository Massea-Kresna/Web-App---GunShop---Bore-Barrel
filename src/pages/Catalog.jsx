import { useMemo, useState } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

const TYPES = ['All', ...new Set(GUNS.map((g) => g.type))]

const SORTS = {
  Default: { label: 'Default', fn: null },
  'name-asc': { label: 'Name (A-Z)', fn: (a, b) => a.name.localeCompare(b.name) },
  'name-desc': { label: 'Name (Z-A)', fn: (a, b) => b.name.localeCompare(a.name) },
  'price-asc': { label: 'Price (Cheapest)', fn: (a, b) => a.price - b.price },
  'price-desc': { label: 'Price (Most Expensive)', fn: (a, b) => b.price - a.price },
}

function Catalog() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('All')
  const [sort, setSort] = useState('Default')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = GUNS.filter(
      (g) =>
        (type === 'All' || g.type === type) &&
        g.name.toLowerCase().includes(q),
    )
    const cmp = SORTS[sort].fn
    return cmp ? [...filtered].sort(cmp) : filtered
  }, [query, type, sort])

  const isFiltered = query !== '' || type !== 'All' || sort !== 'Default'

  const reset = () => {
    setQuery('')
    setType('All')
    setSort('Default')
  }

  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A small armory of pistols, rifles, and shotguns. Every piece listed with its
          type, caliber, and price — nothing else.
        </p>
      </section>

      <section>
        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count" aria-live="polite">
            {results.length === GUNS.length
              ? `${GUNS.length} pieces`
              : `${results.length} of ${GUNS.length} pieces`}
          </span>
        </div>

        <div className="toolbar" role="search">
          <label className="field field-search">
            <span>Search for products</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a product name..."
            />
          </label>

          <label className="field">
            <span>Gun Type</span>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              {TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {Object.entries(SORTS).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </label>

          {isFiltered && (
            <button type="button" className="toolbar-reset" onClick={reset}>
              Reset
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <ul className="stock">
            {results.map((gun) => <GunCard key={gun.name} gun={gun} />)}
          </ul>
        ) : (
          <p className="empty">No products match your search.</p>
        )}
      </section>
    </>
  )
}

export default Catalog
