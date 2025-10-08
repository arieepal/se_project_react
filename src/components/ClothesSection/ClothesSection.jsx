import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
  currentUser,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section_area">
        <p>Your Item</p>
        <button className="clothing_new-button" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems.map((item) => {
          console.log(clothingItems);
          console.log(clothingItems.map((item) => item._id));
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              currentUser={currentUser}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
