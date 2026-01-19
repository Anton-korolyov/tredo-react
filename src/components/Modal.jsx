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

  {/* CATEGORY + CITY */}
  <div className="modal-meta">
    <span className="modal-category">
      {item.categoryName}
    </span>

    <span className="modal-city">
      {item.cityName}
    </span>
  </div>

  {/* TITLE */}
  <h2 className="modal-title">
    {item.title}
  </h2>

  {/* DESCRIPTION */}
  <p className="modal-description">
    {item.description}
  </p>

  {/* PHONE + PRICE */}
  <div className="modal-bottom">
    <div className="modal-phone">
      📞 {item.phone}
    </div>

    <div className="modal-price">
      ₪ {item.price.toLocaleString()}
    </div>
  </div>

  {/* ACTIONS — НЕ ТРОГАЕМ */}
 

</div>
 {isOwner && (
    <div className="modal-footer">
      <button className="action-btn edit" onClick={onEdit}>
        ✏️ Edit
      </button>

      <button className="action-btn delete" onClick={onDelete}>
        🗑 Delete
      </button>
    </div>
  )}
      </div>
    </div>
  );
}
