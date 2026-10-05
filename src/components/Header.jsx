const NAV = ['Catalog', 'About', 'Contact', 'Cart']

function Header({ tab, onTab, cartCount = 0 }) {
  return (
    <header className="header">
      <span className="brand display">Bore &amp; Barrel</span>
      <nav className="nav">
        {NAV.map((item) => (
          <button
            key={item}
            type="button"
            className={tab === item ? 'nav-link active' : 'nav-link'}
            onClick={() => onTab(item)}
            aria-label={item === 'Cart' ? `Cart, ${cartCount} items` : undefined}
          >
            {item}
            {item === 'Cart' && cartCount > 0 && (
              <span className="badge" aria-hidden="true">{cartCount}</span>
            )}
          </button>
        ))}
      </nav>
    </header>
  )
}

export default Header
