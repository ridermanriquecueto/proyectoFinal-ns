// controllers/auth.controller.js
import authService from '../services/auth.service.js';

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      const error = new Error('Debe proporcionar username y password (400).');
      error.status = 400;
      throw error;
    }
    const result = authService.login(username, password);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export default { login };
