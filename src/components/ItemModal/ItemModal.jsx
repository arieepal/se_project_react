import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({ isOpen, onClose, item, openConfirmationModal }) {
  const handleDeleteClick = () => {
    openConfirmationModal(item);
    onClose();
  };

  const currentUser = useContext(CurrentUserContext);
  const isOwn = item?.owner === currentUser?._id;
  const itemDeleteButtonClassName = `modal__delete-button ${
    !isOwn ? "modal__delete-button_hidden" : ""
  }`;
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_item"
        ></button>
        <img src={item.imageUrl} alt={item.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{item.name}</h2>
          <p className="modal__weather">Weather:{item.weather}</p>
          <button
            className={itemDeleteButtonClassName}
            onClick={handleDeleteClick}
            type="button"
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
