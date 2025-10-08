import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.png";
// import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleRegisterClick,
  handleLoginClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);
  const username = currentUser?.name || "";

  const getUserInitial = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>

        <ToggleSwitch />
        {isLoggedIn ? (
          <div className="header__user-info">
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
              name="add-garment"
              id="add-garment"
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__link">
              <div className="header__profile">
                <p className="header__username">{username}</p>
                {currentUser?.avatar ? (
                  <img
                    className="header__avatar"
                    src={currentUser.avatar}
                    alt="user-avatar"
                  />
                ) : (
                  <span className="header__avatar header__avatar_none">
                    {getUserInitial(username)}
                  </span>
                )}
              </div>
            </Link>
          </div>
        ) : (
          <div className="header__auth-btns">
            <button
              className="header__signup"
              onClick={handleRegisterClick}
              type="button"
              name="register"
              id="register"
            >
              Sign Up
            </button>
            <button
              className="header__login"
              onClick={handleLoginClick}
              type="button"
              name="login"
              id="login"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
