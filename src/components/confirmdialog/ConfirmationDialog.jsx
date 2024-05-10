import React from 'react';
import './ConfirmationDialog.scss';

const ConfirmationDialog = ({ open, message, onCancel, onConfirm }) => {
  return (
    <div className={`confirmation-dialog ${open ? 'open' : ''}`}>
      <div className="dialog-content">
        <div className="message">{message}</div>
        <div className="actions">
          <button className="cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
