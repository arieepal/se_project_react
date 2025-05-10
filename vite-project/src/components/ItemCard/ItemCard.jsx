import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  return (
    <li className="card">
      <h2 className="card-name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card-image"
        src={item.link}
        alt="item.name"
      />
    </li>
  );
}

export default ItemCard;
