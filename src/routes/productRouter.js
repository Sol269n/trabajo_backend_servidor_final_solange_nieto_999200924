
import { Router } from "express"
import { 
  getProducts, 
  getAllProductsAdmin,
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from "../controllers/productControllers.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import { createProductSchema, updateProductSchema } from "../schemas/productSchema.js"
import { checkOwnershipOrAdmin } from "../middlewares/ownershipMiddleware.js"

const ProductRouter = Router()

// Protegemos todas las rutas con JWT
ProductRouter.use(authMiddleware)

// Endpoint especial para Admin (debe ir antes de /:id para no interferir)
ProductRouter.get("/all", (req, res, next) => {
  if (req.userLogged.role !== "admin") {
    return res.status(403).json({ success: false, message: "Acceso denegado: Requiere rol de Administrador" })
  }
  getAllProductsAdmin(req, res, next)
})

// Traer productos (si es user trae sus productos, si es admin trae todos)
ProductRouter.get("/", getProducts)

// Traer un solo producto por ID
ProductRouter.get("/:id", getProduct)

// Crear producto
ProductRouter.post("/", validateSchema(createProductSchema), createProduct)

// Actualizar producto
ProductRouter.put("/:id", checkOwnershipOrAdmin, validateSchema(updateProductSchema), updateProduct)

// Borrar producto
ProductRouter.delete("/:id", checkOwnershipOrAdmin, deleteProduct)

export { ProductRouter }