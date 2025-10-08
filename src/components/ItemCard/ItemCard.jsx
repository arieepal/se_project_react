import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike, currentUser, isLoggedIn }) {
  console.log(item);

  const isLiked =
    currentUser && Array.isArray(item.likes)
      ? item.likes.some((id) => id === currentUser._id)
      : null;

  const itemLikeButton = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };
  const handleLike = () => {
    if (isLiked === null) return;
    onCardLike({ id: item._id, isLiked });
  };
  console.log("Image URL:", item.imageUrl, "Fallback Link:", item.link);
  return (
    <li className="card">
      <h2 className="card-name">{item.name}</h2>
      {isLoggedIn && (
        <button className={itemLikeButton} type="button" onClick={handleLike} />
      )}
      <img
        onClick={handleCardClick}
        className="card-image"
        src={item.imageUrl || item.link}
        alt={item.name}
        isLoggedIn={isLoggedIn}
      />
    </li>
  );
}

export default ItemCard;
