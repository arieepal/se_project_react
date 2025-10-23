import { useEffect, useState, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../EditProfileModal/EditProfileModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({ isOpen, onSubmit, onClose }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };
  const handleAvatarChange = (evt) => {
    setAvatar(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit({ name, avatar });
  };

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  return (
    <ModalWithForm
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      title="Change profile data"
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name *{""}
        <input
          className="modal__input"
          id="edit-name"
          type="text"
          name="edit-name"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
          required
        />
      </label>
      <label htmlFor="imageURL" className="modal__label">
        Avatar URL *{""}
        <input
          className="modal__input"
          name="edit-avatarUrl"
          id="edit-avatarUrl"
          type="text"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
