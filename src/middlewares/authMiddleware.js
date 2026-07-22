
import jwt from "jsonwebtoken"
import { config } from "dotenv"
config()

const authMiddleware = (req, res, next) => {
  // Miro si el usuario mandó el token en la cabecera de la petición
  const header = req.headers.authorization

  // Si no mandó nada o no empieza con "Bearer ", le reboto la entrada
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "Unauthorized" })
  }

  // Corto el texto para quedarme solo con el chorizo del token puro
  const token = header.split(" ")[1]

  try {
    // Intento abrir el token con la clave secreta de mi .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Si salió bien, guardo los datos del usuario logueado en la petición
    req.userLogged = decoded

    // Le doy el pase al siguiente paso (el controlador de productos)
    next()
  } catch (e) {
    // Si el token expiró o está trucho, tiro error de una
    res.status(401).json({ success: false, error: e.message })
  }
}

export { authMiddleware }