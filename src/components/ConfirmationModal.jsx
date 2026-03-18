import React from 'react';
import '../styles/confirmationModal.css';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3 className="modal__title">Confirm Deletion</h3>
                <p>{message}</p>
                <div className="modal__buttons">
                    <button onClick={onClose} className="modal__btn modal__btn--cancel">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="modal__btn modal__btn--delete">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
