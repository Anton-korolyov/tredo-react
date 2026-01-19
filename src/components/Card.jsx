import "./Card.css";

function Card({ item, onClick }) {
const API_BASE_URL = import.meta.env.VITE_API_URL;
  const imageUrl = item.image
    ? `${API_BASE_URL }${item.image}`
    : "/placeholder.png";
  return (
    <div className="card" onClick={onClick}>
      <img src={imageUrl} alt={item.title} />

      <div className="card-body">
         <div className="card-category">
            {item.categoryName}
          </div>
        <h3>{item.title}</h3>
        
        <div className="card-info">
          <span className="price">₪ {item.price.toLocaleString()}</span>
         <span className="city">{item.cityName}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;

