

export const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    // Leemos req.userLogged que viene de tu authMiddleware
    if (!req.userLogged || !allowedRoles.includes(req.userLogged.role)) {
      return res.status(403).json({
        success: false,
        error: "Acceso denegado: No tenés los permisos requeridos para esta acción."
      });
    }
    next();
  };
};