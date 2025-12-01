// middlewares/error.middleware.js

export const handleNotFound = (req, res, next) => {
  res.status(404).json({
    code: 404,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
    timestamp: new Date().toISOString()
  });
};

export const handleErrors = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || err.statusCode || 500;
  let message = err.message || 'Error interno del servidor.';
  if (status === 401 && !message) message = 'Autenticación requerida.';
  if (status === 403) message = 'Acceso denegado.';
  res.status(status).json({
    code: status,
    message,
    method: req.method,
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
};

export default { handleNotFound, handleErrors };
