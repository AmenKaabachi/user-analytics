// userService.js
import db from '../config/db.js';

export const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const createUser = (companyName, email, password) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO users (company_name, email, password) VALUES (?, ?, ?)',
      [companyName, email, password],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

export const updateUserProfile = (userId, companyName, email) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE users SET company_name = ?, email = ? WHERE id = ?',
      [companyName, email, userId],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

export const getUserProfile = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT company_name, email, password FROM users WHERE id = ?',
      [userId],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};
