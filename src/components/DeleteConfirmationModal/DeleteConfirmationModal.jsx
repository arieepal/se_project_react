import React from "react";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_confirm">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_confirm"
        ></button>
        <h2 className="modal__title_confirm">
          Are you sure you want to delete this item? This action is
          irreversible.
        </h2>

        <div className="modal__actions">
          <button
            onClick={onConfirm}
            className="modal__button modal__button_type_confirm"
          >
            Yes, delete item
          </button>
          <button
            onClick={onClose}
            className="modal__button modal__button_type_cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
