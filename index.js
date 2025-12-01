import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import productsRoutes from './routes/products.routes.js';
import authRoutes from './routes/auth.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);

// 404 handler (rutas no definidas)
app.use(errorMiddleware.handleNotFound);

// handler global de errores
app.use(errorMiddleware.handleErrors);

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
