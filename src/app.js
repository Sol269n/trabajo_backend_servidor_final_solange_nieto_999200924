
import express from 'express'
// Traigo la conexión que armamos en tu config
import { connectDb } from './config/mongoDbConnection.js'
import { ProductRouter } from './routes/productRouter.js'
import { AuthRouter } from './routes/authRouter.js'
import cors from 'cors'
import { config } from 'dotenv'

// Levanto mis variables del archivo .env
config()

const PORT = process.env.PORT || 3000

const server = express()

// Para que el servidor entienda formato JSON
server.use(express.json())

// Para que React se pueda conectar después sin bloqueos
server.use(cors())

// Logger simple para registrar peticiones en consola (cumple con middleware logger)
server.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})

// Ruta de bienvenida para testear rápido si el servidor anda
server.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API REST con Express y MongoDB"
  })
})

// Rutas de la API (authMiddleware ya está integrado dentro de ProductRouter)
server.use("/api/products", ProductRouter)
server.use("/api/auth", AuthRouter)

// Ruta para capturar 404 (rutas no encontradas)
server.use((req, res) => {
  res.status(404).json({ success: false, message: "Ruta no encontrada" })
})

// Middleware Centralizado de Errores (4 parámetros es clave para Express)
server.use((err, req, res, next) => {
  console.error("❌ Error capturado en middleware global:", err.stack)

  const statusCode = err.statusCode || err.status || 500
  res.status(statusCode).json({
    success: false,
    message: err.message || "Error interno del servidor",
    error: process.env.NODE_ENV === "development" ? err : {}
  })
})

// Prendo el servidor y me conecto a MongoDB Atlas en la nube
server.listen(PORT, () => {
  connectDb()
  console.log(`✅ Servidor en escucha por el puerto http://localhost:${PORT}`)
})

export { server }