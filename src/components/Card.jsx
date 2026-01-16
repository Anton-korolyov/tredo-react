import "./Card.css";
import { API_BASE_URL  } from "../api/axios";
function Card({ item, onClick }) {

  const imageUrl = item.image
    ? `${API_BASE_URL }${item.image}`
    : "/placeholder.png";
  return (
    <div className="card" onClick={onClick}>
      <img src={imageUrl} alt={item.title} />

      <div className="card-body">
        <h3>{item.title}</h3>

        <div className="card-info">
          <span className="price">₪ {item.price.toLocaleString()}</span>
          <span className="city">{item.city}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;

