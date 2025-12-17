import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    };

    const modalStyle = {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '90%',
        textAlign: 'center'
    };

    const buttonGroupStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginTop: '1.5rem'
    };

    const buttonBaseStyle = {
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold'
    };

    const deleteButtonStyle = {
        ...buttonBaseStyle,
        backgroundColor: '#ff4757',
        color: 'white'
    };

    const cancelButtonStyle = {
        ...buttonBaseStyle,
        backgroundColor: '#e0e0e0',
        color: '#333'
    };

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h3 style={{ marginTop: 0 }}>Confirm Detection</h3>
                <p>{message}</p>
                <div style={buttonGroupStyle}>
                    <button onClick={onClose} style={cancelButtonStyle}>
                        Cancel
                    </button>
                    <button onClick={onConfirm} style={deleteButtonStyle}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
