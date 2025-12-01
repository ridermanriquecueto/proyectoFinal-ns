// services/auth.service.js
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const VALID_USER = {
  username: 'admin',
  password: 'password123'
};

const login = (username, password) => {
  if (username !== VALID_USER.username || password !== VALID_USER.password) {
    const error = new Error('Credenciales inválidas');
    error.status = 401;
    throw error;
  }

  const payload = { id: 'user-001', username, role: 'admin' };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  return { token };
};

export default { login };
