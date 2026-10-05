import { useRef } from 'react'
import QtyControl from './QtyControl.jsx'

function GunCard({ gun, qty = 0, onSetQty }) {
  const popup = useRef(null)

  return (
    <li className="card">
      <button className="card-btn" onClick={() => popup.current.showModal()}>
        <img className="card-img" src={gun.image} alt="" width="120" height="90" />
        <span className="name display">{gun.name}</span>
        <span className="type">
          {gun.type} · {gun.caliber}
        </span>
        <span className="price">${gun.price.toLocaleString()}</span>
      </button>

      <div className="card-cart">
        {qty > 0 ? (
          <QtyControl name={gun.name} qty={qty} onChange={(n) => onSetQty(gun.name, n)} />
        ) : (
          <button
            type="button"
            className="add-btn"
            onClick={() => onSetQty(gun.name, 1)}
          >
            Add to cart
          </button>
        )}
      </div>

      <dialog
        className="popup"
        ref={popup}
        onClick={(e) => e.target === popup.current && popup.current.close()}
      >
        <img className="popup-img" src={gun.image} alt="" width="240" height="180" />
        <h3 className="display">{gun.name}</h3>
        <p className="type">
          {gun.type} · {gun.caliber} · <span className="price">${gun.price.toLocaleString()}</span>
        </p>
        <p>{gun.description}</p>
        <form method="dialog">
          <button className="popup-close">Close</button>
        </form>
      </dialog>
    </li>
  )
}

export default GunCard
