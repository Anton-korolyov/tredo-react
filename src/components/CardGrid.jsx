import Card from "./Card";
import "./CardGrid.css";

function CardGrid({ items, onSelect }) {
  return (
    <div className="card-grid">
      {items.map((item) => (
        <Card
          key={item.id}
          item={item}
          onClick={() => onSelect(item)}
        />
      ))}
    </div>
  );
}

export default CardGrid;
