
import { Router } from "express"
import { limiter } from "../middlewares/limiterMiddleware.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import { registerSchema, loginSchema } from "../schemas/authSchema.js"
import { register, login } from "../controllers/authControllers.js"

const AuthRouter = Router()

// Ruta para crear una cuenta nueva (validada con Zod)
AuthRouter.post("/register", validateSchema(registerSchema), register)

// Ruta para iniciar sesión (protegida por limitador y validada con Zod)
AuthRouter.post("/login", limiter, validateSchema(loginSchema), login)

export { AuthRouter }