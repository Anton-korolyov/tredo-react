import "./Modal.css";

export default function Modal({
  item,
  isOwner,     // 👈 НОВОЕ
  onClose,
  onEdit,
  onDelete,
}) {
const API_BASE_URL = import.meta.env.VITE_API_URL;
    const imageUrl = item.image
    ? `${API_BASE_URL }${item.image}`
    : "/placeholder.png";
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
        >
          ×
        </button>

        <img src={imageUrl} alt={item.title} />

        <div className="modal-content">
          <h2>{item.title}</h2>

          <div className="modal-price">
            ₪ {item.price.toLocaleString()}
          </div>

          <div className="modal-city">{item.city}</div>

          <p>{item.description}</p>

          <div className="modal-phone">
            <a href={`tel:${item.phone}`}>
              📞 {item.phone}
            </a>
          </div>

          {/* ACTIONS */}
          {isOwner && (
            <div className="modal-actions">
              <button
                className="action-btn edit"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit && onEdit();
                }}
              >
                ✏️ Edit
              </button>

              <button
                className="action-btn delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete && onDelete();
                }}
              >
                🗑 Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
