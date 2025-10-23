import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section_area">
        <p>Your Item</p>
        <button className="clothing_new-button" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems
          .filter((item) => item.owner === currentUser?._id)
          .map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              currentUser={currentUser}
              isLoggedIn={isLoggedIn}
            />
          ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
