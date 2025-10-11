import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike, currentUser, isLoggedIn }) {
  // const isLoggedIn = !!currentUser;

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
      />
    </li>
  );
}

export default ItemCard;
