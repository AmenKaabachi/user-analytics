import React from 'react';
import styles from './ToastNotification.module.css';

function ToastNotification({ type, message, onClose }) {
  return (
    <div
      id="toast"
      className={`${styles.toast} ${type === 'success' ? styles.toastSuccess : styles.toastError}`}
    >
      <div className={styles.toastContainer1}>
        <i className="fas fa-check-square"></i>
      </div>
      <div className={styles.toastContainer2}>
        <p id="toast-title">{type === 'success' ? 'Success' : 'Error'}</p>
        <p id="toast-message">{message}</p>
      </div>
      <button id="close-toast" onClick={onClose}>
        &times;
      </button>
      <div id="toast-progress" className={styles.toastProgress}></div>
    </div>
  );
}

export default ToastNotification;
