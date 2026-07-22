
import rateLimit from "express-rate-limit"

const limiter = rateLimit({
  // El tiempo de espera: 15 minutos pasados a milisegundos
  windowMs: 15 * 60 * 1000, 
  
  // Candado: Máximo 5 peticiones por cada IP cada 15 minutos
  limit: 5, 

  // Qué pasa si se pasan del límite: les tiro error 429
  handler: (req, res) => {
    res.status(429).json({ error: "Too many requests, please try again later." })
  }
})

export { limiter }