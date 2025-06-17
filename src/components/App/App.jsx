import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { defaultClothingItems } from "../../utils/clothingItems";
import { getItems, addItem, deleteItem } from "../../utils/api";

import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const openConfirmationModal = (item) => {
    setItemToDelete(item);
    setIsConfirmModalOpen(true);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    addItem({ name, imageUrl, weather })
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })

      .catch((err) => console.error("Weather fetch error:", err));
  };

  const handleDeleteItem = () => {
    if (!itemToDelete) return;
    deleteItem(itemToDelete._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemToDelete._id)
        );
        setIsConfirmModalOpen(false);
        setItemToDelete(null);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <BrowserRouter basename="/se_project_react">
        <div className="page">
          <div className="page__content">
            <Header handleAddClick={handleAddClick} weatherData={weatherData} />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                  />
                }
              />
            </Routes>
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            item={selectedCard}
            onClose={closeActiveModal}
            openConfirmationModal={openConfirmationModal}
          />
          <DeleteConfirmationModal
            isOpen={isConfirmModalOpen}
            onClose={() => {
              setIsConfirmModalOpen(false);
              setItemToDelete(null);
            }}
            onConfirm={handleDeleteItem}
          />

          <Footer></Footer>
        </div>
      </BrowserRouter>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
