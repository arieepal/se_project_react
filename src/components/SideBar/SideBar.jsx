import "./SideBar.css";
import avatar from "../../assets/avatar.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function SideBar({ handleEditProfileClick, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser?.avatar}
        alt="Default avatar"
      />
      <p className="sidebar__username">{currentUser?.name}</p>
      <div className="sidebar__buttons">
        <button
          onClick={handleEditProfileClick}
          id="edit-profile"
          name="edit-profile"
          className="sidebar__edit-profile"
        >
          Edit Profile
        </button>
        <button onClick={onSignOut} type="button" className="sidebar__logout">
          Log Out
        </button>
      </div>
    </div>
  );
}
export default SideBar;
