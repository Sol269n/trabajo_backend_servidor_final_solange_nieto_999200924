
import { User } from "../models/UserModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { config } from "dotenv"
config()

const register = async (req, res) => {
  try {
    const { password, username, email, role } = req.body

    // 1. Me fijo si el email ya existe en la base de datos de Mongo
    const foundUser = await User.findOne({ email })
    if (foundUser) {
      return res.status(409).json({ success: false, error: "Conflict, user already exists" })
    }

    // 2. Encripto la contraseña (hashing) para que nadie pueda verla pura en la BD
    const hashPassword = await bcrypt.hash(password, 10)

    // 3. Creo y guardo el nuevo usuario en MongoDB con su rol correspondiente
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
      role // Si viene vacío, Mongoose le asigna "user" por defecto
    })

    // Oculto la contraseña y armo los datos públicos a responder
    const publicDataUser = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    }

    res.status(201).json({
      success: true,
      data: publicDataUser,
      message: "User registered successfully"
    })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error registering user" })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(401).json({ success: false, error: "Unauthorized" })
    }

    // 1. Busco si existe el usuario por su email
    const foundUser = await User.findOne({ email })
    if (!foundUser) {
      return res.status(403).json({ success: false, error: "Unauthorized" })
    }

    // 2. Comparo la contraseña que ingresó con el hash guardado en la BD
    const isValid = await bcrypt.compare(password, foundUser.password)
    if (!isValid) {
      return res.status(403).json({ success: false, error: "Unauthorized" })
    }

    // 3. Incluimos el ID, email y ROL en el payload del token JWT
    const payload = { 
      id: foundUser._id, 
      username: foundUser.username, 
      email: foundUser.email,
      role: foundUser.role 
    }
    const secretKey = process.env.JWT_SECRET
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" })

    res.json({ success: true, data: { token }, message: "Login successful" })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error logging in" })
  }
}

export { register, login }