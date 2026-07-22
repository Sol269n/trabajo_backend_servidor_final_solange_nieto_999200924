

// Middleware para validar el body contra cualquier esquema de Zod
export const validateSchema = (schema) => (req, res, next) => {
  try {
    // Le pasamos el body a Zod para que revise que todo esté en regla
    schema.parse(req.body);
    // Si no saltó ningún error, le damos luz verde para que siga al controlador
    next();
  } catch (error) {
    // Si Zod encuentra algo mal, agarramos los errores y los devolvemos limpitos
    return res.status(400).json({
      success: false,
      error: "Error de validación de datos",
      details: error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message
      }))
    });
  }
};