

import { Schema, model } from "mongoose"

// Esquema para definir los datos del usuario en la base de datos
const userSchema = new Schema({
  username: { type: String, required: true },
  // unique: true hace que Mongo no permita registrar dos veces el mismo mail
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Rol para manejar los permisos (por defecto arranca como usuario normal)
  role: { type: String, enum: ["user", "admin"], default: "user" }
}, {
  // Saca el campo de versión "__v" de las respuestas
  versionKey: false,
  // Nos guarda fecha y hora de creación/modificación de la cuenta
  timestamps: true
})

// Creo el modelo para interactuar con la base de datos
const User = model("User", userSchema)

export { User }