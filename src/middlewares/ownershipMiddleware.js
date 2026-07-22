

import { Product } from "../models/ProductModel.js";

export const checkOwnershipOrAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, error: "Producto no encontrado." });
    }

    /* // Comprobamos si el dueño coincide con el ID logueado o si el usuario es Admin
    const isOwner = product.userId.toString() === req.userLogged.id;
    const isAdmin = req.userLogged.role === "admin"; */

    // Comprobamos si el dueño coincide con el ID logueado o si el usuario es Admin (probando)
    const loggedUserId = req.userLogged.id || req.userLogged._id;
    const isOwner = product.userId.toString() === loggedUserId.toString();
    const isAdmin = req.userLogged.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        error: "Acceso denegado: No tenés permisos sobre este producto."
      });
    }

    req.product = product; // Guardamos el producto por si el controlador lo necesita
    next();
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};