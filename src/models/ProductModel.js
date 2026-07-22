
import { Schema, model } from "mongoose"

const productSchema = new Schema({
  // El nombre es obligatorio, el resto si viene vacío tiene valores por defecto
  name: { type: String, required: true },
  price: { type: Number, default: 0 },
  category: { type: String, default: "Sin categoria" },
  stock: { type: Number, default: 0 },
  available: { type: Boolean, default: false },
  // Relaciono el producto con el ID único del usuario dueño de la cuenta
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, {
  // Saca el campo "__v" molesto que mete Mongo por defecto
  versionKey: false,
  // Crea automáticamente los campos "createdAt" y "updatedAt" (cuándo se creó/modificó)
  timestamps: true
})

const Product = model("Product", productSchema)

export { Product }