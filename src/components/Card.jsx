import "./Card.css";

function Card({ item, onClick }) {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const imageUrl = item?.image
    ? `${API_BASE_URL}${item.image}?v=${item.id}`
    : "/placeholder.png";

  const price = Number(item?.price ?? 0);

  return (
    <div className="card" onClick={onClick}>
      <img src={imageUrl} alt={item?.title || ""} />

      <div className="card-body">
        <div className="card-category">
          {item?.categoryName}
        </div>

        <h3>{item?.title}</h3>

        <div className="card-info">
          <span className="price">
            ₪ {price.toLocaleString("he-IL")}
          </span>

          <span className="city">
            {item?.cityName}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;

