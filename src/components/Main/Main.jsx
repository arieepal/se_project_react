import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import currentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
// import { BrowserRouter } from "react-router-dom";

function Main({ weatherData, onCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext);

  return (
    // <BrowserRouter>
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;
          {currentTemperatureUnit}/ You may want to wear:
        </p>

        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })

            .map((item) => {
              return (
                <ItemCard key={item.id} item={item} onCardClick={onCardClick} />
              );
            })}
        </ul>
      </section>
    </main>
    // </BrowserRouter>
  );
}

export default Main;
