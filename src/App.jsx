import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Catalog from './pages/Catalog.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Cart from './pages/Cart.jsx'
import GUNS from './data/guns.js'
import './App.css'

const CART_KEY = 'bore-barrel-cart'

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY)) ?? {}
    const valid = {}
    for (const g of GUNS) {
      const n = Number(saved[g.name])
      if (Number.isInteger(n) && n > 0) valid[g.name] = n
    }
    return valid
  } catch {
    return {}
  }
}

function App() {
  const [tab, setTab] = useState('Catalog')
  const [cart, setCart] = useState(loadCart)

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart))
    } catch {

    }
  }, [cart])

  const setQty = (name, qty) =>
    setCart((cur) => {
      const next = { ...cur }
      if (qty > 0) next[name] = qty
      else delete next[name]
      return next
    })

  const cartCount = Object.values(cart).reduce((sum, n) => sum + n, 0)

  return (
    <div className="shell">
      <Header tab={tab} onTab={setTab} cartCount={cartCount} />

      <main className="main">
        {tab === 'Catalog' && <Catalog cart={cart} onSetQty={setQty} />}
        {tab === 'Cart' && (
          <Cart
            cart={cart}
            onSetQty={setQty}
            onClear={() => setCart({})}
            onBrowse={() => setTab('Catalog')}
          />
        )}
        {tab === 'About' && <About />}
        {tab === 'Contact' && <Contact />}
      </main>

      <Footer />
    </div>
  )
}

export default App
