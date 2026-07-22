/* 

import { Router } from "express"
// Traigo el middleware que limita las peticiones por IP
import { limiter } from "../middlewares/limiterMiddleware.js"
import { validateSchema } from "../middlewares/validateSchema.js"
// Importamos los esquemas con sus nombres reales
import { registerSchema, loginSchema } from "../schemas/authSchema.js"
import { register, login } from "../controllers/authControllers.js"

const AuthRouter = Router()

// Ruta para crear una cuenta nueva (validada con Zod)
AuthRouter.post("/register", validateSchema(registerSchema), register)

// Ruta para iniciar sesión (protegida por el limitador de intentos y validada con Zod)
AuthRouter.post("/login", limiter, validateSchema(loginSchema), login)

export { AuthRouter } */

import { z } from "zod";

// Validaciones para el registro de usuarios
export const registerSchema = z.object({
  username: z.string().min(3, "El nombre de usuario tiene que tener al menos 3 letras"),
  email: z.string().email("Mandaste un email que no existe o está mal escrito"),
  password: z.string().min(6, "La contraseña es muy corta, poné mínimo 6 caracteres"),
  role: z.enum(["user", "admin"]).optional().default("user")
});

// Validaciones para el login
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Tenés que poner la contraseña")
});







