import React from 'react';
import './Alert.css'; // Create this CSS file to style your alert box

const Alert =  ({ message, onConfirm, onCancel }) => {
    return (
      <div className="custom-alert-overlay">
        <div className="custom-alert-box">
          <p>{message}</p>
          <div className="alert-buttons">
            <button onClick={onConfirm} className="confirm-btn">Yes</button>
            <button onClick={onCancel} className="cancel-btn">No</button>
          </div>
        </div>
      </div>
    );
  };

export default Alert;
