import React from 'react';
import "./ErrorModal.css"

interface ErrorModalProps {
  message: string;
  onClose: (value: React.SetStateAction<boolean>) => void,
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
    return (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
          }}
        >
            <div className='error-modal-content'>
                <h1>Error occurred</h1>
                <div className='error-modal-content-message'>
                    <p>{message}</p>
                </div>
                <div className='error-modal-content-button'>
                    <button onClick={() => {onClose(false)}}>Close</button>
                </div>
          </div>
        </div>
    );
};

export default ErrorModal;