import "../RegisterModal/RegisterModal.css";
import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose, onSubmit, onLogin, activeModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };
  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };
  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };
  const handleAvatarChange = (evt) => {
    setAvatar(evt.target.value);
  };
  useEffect(() => {
    setEmail("");
    setPassword("");
    setName("");
    setAvatar("");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password, name, avatar });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign Up"
      activeModal={activeModal}
      onSubmit={handleSubmit}
      buttonText="Next"
    >
      <label htmlFor="register-email" className="modal__label">
        Email {""}
        <input
          className="modal__input"
          id="register-email"
          type="email"
          name="register-email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
          required
        />
      </label>{" "}
      <label htmlFor="register-password" className="modal__label">
        Password {""}
        <input
          className="modal__input"
          id="register-password"
          type="password"
          name="register-password"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
          required
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name {""}
        <input
          className="modal__input"
          id="register-name"
          type="text"
          name="register-name"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
          required
        />
      </label>
      <label htmlFor="register-avatarUrl" className="modal__label">
        Avatar URL {""}
        <input
          className="modal__input"
          name="register-avatarUrl"
          id="register-avatarUrl"
          type="url"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
          required
        />
      </label>
      <button
        className="login-or__btn"
        onClick={onLogin}
        type="button"
        name="login"
        id="login"
      >
        or Login
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;
