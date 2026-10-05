import GUNS from '../data/guns.js'
import QtyControl from '../components/QtyControl.jsx'

function Cart({ cart, onSetQty, onClear, onBrowse }) {
  const items = GUNS.filter((g) => cart[g.name] > 0).map((g) => ({
    ...g,
    qty: cart[g.name],
    subtotal: g.price * cart[g.name],
  }))
  const total = items.reduce((sum, i) => sum + i.subtotal, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <section className="page">
      <h1 className="display">Your cart</h1>

      {items.length === 0 ? (
        <div className="empty">
          <p>Your cart is empty.</p>
          <button type="button" className="add-btn add-btn-inline" onClick={onBrowse}>
            Browse the catalog
          </button>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((i) => (
              <li key={i.name} className="cart-row">
                <img className="cart-img" src={i.image} alt="" width="72" height="54" />
                <div className="cart-info">
                  <span className="name display">{i.name}</span>
                  <span className="type">
                    {i.type} · {i.caliber} · ${i.price.toLocaleString()} each
                  </span>
                </div>
                <QtyControl name={i.name} qty={i.qty} onChange={(n) => onSetQty(i.name, n)} />
                <span className="price cart-subtotal">${i.subtotal.toLocaleString()}</span>
                <button
                  type="button"
                  className="cart-remove"
                  onClick={() => onSetQty(i.name, 0)}
                  aria-label={`Remove ${i.name} from cart`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <button type="button" className="toolbar-reset" onClick={onClear}>
              Clear cart
            </button>
            <div className="cart-total">
              <span className="cart-total-label">
                Total · {count} {count === 1 ? 'item' : 'items'}
              </span>
              <span className="cart-total-value display">${total.toLocaleString()}</span>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default Cart
