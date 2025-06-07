import "./ItemModal.css";

function ItemModal({ isOpen, onClose, item, openConfirmationModal }) {
  const handleDeleteClick = () => {
    openConfirmationModal(item);
    onClose();
  };
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_item"
        ></button>
        <img
          src={item.imageUrl}
          alt="clothing-image"
          className="modal__image"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{item.name}</h2>
          <p className="modal__weather">Weather:{item.weather}</p>
          <button
            className="card_delete"
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
