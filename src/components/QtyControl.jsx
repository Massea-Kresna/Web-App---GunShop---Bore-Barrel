function QtyControl({ name, qty, onChange }) {
  return (
    <div className="qty" role="group" aria-label={`Quantity of ${name}`}>
      <button
        type="button"
        className="qty-btn"
        onClick={() => onChange(qty - 1)}
        aria-label={qty <= 1 ? `Remove ${name}` : `Decrease quantity of ${name}`}
      >
        -
      </button>
      <span className="qty-value" aria-live="polite">{qty}</span>
      <button
        type="button"
        className="qty-btn"
        onClick={() => onChange(qty + 1)}
        aria-label={`Increase quantity of ${name}`}
      >
        +
      </button>
    </div>
  )
}

export default QtyControl