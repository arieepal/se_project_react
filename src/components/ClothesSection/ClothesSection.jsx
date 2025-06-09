import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/clothingItems";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onCardClick, clothingItems, weatherData }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section_area">
        <p>Your Item</p>
        <button className="clothing_new-button">+ Add New</button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems
          .filter((item) => {
            if (!weatherData) return false;
            return item.weather === weatherData.type;
          })
          .map((item) => {
            console.log(item._id);
            return (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
