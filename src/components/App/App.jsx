import "./App.css";

import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import * as auth from "../../utils/auth";
import * as api from "../../utils/api";

import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { defaultClothingItems } from "../../utils/clothingItems";
import { getItems, addItem, deleteItem } from "../../utils/api";
// import { register, login, checkToken, updateUser } from "../../utils/auth";

import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import LoginModal from "../LoginModal/LoginModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    email: "",
    name: "",
    avatar: "",
  });

  const [token, setToken] = useState(localStorage.getItem("jwt") || "");
  const navigate = useNavigate();

  const handleRegister = ({ email, password, name, avatar }) => {
    auth
      .register({ email, password, name, avatar })
      .then((res) => {
        handleLogin({ email: res.email, password });
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    auth
      .login({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setToken(res.token);
        return auth.checkToken(res.token);
      })
      .then((res) => {
        setCurrentUser(res);
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/profile");
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const request = isLiked ? api.removeCardLike : api.addCardLike;

    request(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard.data : item))
        );
      })
      .catch((err) => console.log("Like error:", err));
  };

  const handleEditProfile = ({ name, avatar }) => {
    auth
      .updateUser({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({ email: "", name: "", avatar: "" });
    navigate("/");
    closeActiveModal();
    setToken("");
  };

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

  const handleLoginClick = () => {
    setActiveModal("login");
  };
  const handleRegisterClick = () => {
    setActiveModal("register");
  };
  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    addItem({ name, imageUrl, weather }, token)
      .then((newItem) => {
        setClothingItems([newItem.data, ...clothingItems]);
        closeActiveModal();
      })

      .catch((err) => console.error("Weather fetch error:", err));
  };

  const handleDeleteItem = () => {
    const token = localStorage.getItem("jwt");
    if (!itemToDelete) return;
    deleteItem(itemToDelete._id, token)
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
    api
      .getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      setIsLoggedIn(false);
      setToken("");
      return;
    }
    auth
      .checkToken(jwt)
      .then((userData) => {
        setIsLoggedIn(true);
        setCurrentUser(userData);
      })
      .catch((error) => {
        console.error(error);
        localStorage.removeItem("jwt");
        setToken("");
        setIsLoggedIn(false);
      });
  }, []);

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
              handleLogout={handleLogout}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      weatherData={weatherData}
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleLogout={handleLogout}
                      handleEditProfileClick={handleEditProfileClick}
                      onLogout={handleLogout}
                      isLoggedIn={isLoggedIn}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>

          <RegisterModal
            isOpen={activeModal === "register"}
            onSubmit={handleRegister}
            onLogin={handleLoginClick}
            handleCloseClick={closeActiveModal}
            onClose={closeActiveModal}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onSubmit={handleLogin}
            onRegister={handleRegisterClick}
            handleCloseClick={closeActiveModal}
            onClose={closeActiveModal}
          />
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
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onSubmit={handleEditProfile}
            currentUser={currentUser}
          />
          <DeleteConfirmationModal
            isOpen={isConfirmModalOpen}
            onClose={() => {
              setIsConfirmModalOpen(false);
              setItemToDelete(null);
            }}
            onConfirm={handleDeleteItem}
          />
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
