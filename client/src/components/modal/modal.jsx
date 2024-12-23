import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, onConfirm, title, body }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-title">
                        <h1>{title || "Confirm Action"}</h1>
                    </div>
                    <div className="modal-body">
                        <p>{body || "Are you sure you want to proceed?"}</p>
                    </div>
                    <div className="modal-actions">
                        <button onClick={onClose} className="modal-close">Cancel</button>
                        <button onClick={onConfirm} className="modal-confirm">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
