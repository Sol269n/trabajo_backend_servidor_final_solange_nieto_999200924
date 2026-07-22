
import { Product } from "../models/ProductModel.js"

// GET /api/products (Con paginación, filtros por categoría/búsqueda, sort y lógica de rol)
const getProducts = async (req, res, next) => {
  try {
    const userLogged = req.userLogged

    // 1. Extraemos query params con valores por defecto (agregamos sort)
    const { page = 1, limit = 10, category, search, sort = "desc" } = req.query
    const skip = (Number(page) - 1) * Number(limit)

    // 2. Armamos la query dinámica
    const query = {}

    // Si no es admin, solo ve sus propios productos
    if (userLogged.role !== "admin") {
      query.userId = userLogged.id
    }

    // Filtrar por categoría
    if (category) {
      query.category = { $regex: category, $options: "i" }
    }

    // Buscador por nombre
    if (search) {
      query.name = { $regex: search, $options: "i" }
    }

    // Definir ordenamiento (1 para asc, -1 para desc)
    const sortOrder = sort === "asc" ? 1 : -1

    // 3. Consulta a MongoDB
    const products = await Product.find(query, { userId: 0 })
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: sortOrder })

    const totalProducts = await Product.countDocuments(query)
    const totalPages = Math.ceil(totalProducts / Number(limit))

    res.json({
      success: true,
      data: products,
      pagination: {
        totalItems: totalProducts,
        totalPages,
        currentPage: Number(page),
        itemsPerPage: Number(limit)
      },
      message: "Products fetched successfully"
    })
  } catch (error) {
    next(error) // Se pasa al middleware centralizado de errores
  }
}

// GET /api/products/all (Endpoint explícito para Admin)
const getAllProductsAdmin = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, search, sort = "desc" } = req.query
    const skip = (Number(page) - 1) * Number(limit)

    const query = {}
    if (category) query.category = { $regex: category, $options: "i" }
    if (search) query.name = { $regex: search, $options: "i" }

    const sortOrder = sort === "asc" ? 1 : -1

    const products = await Product.find(query, { userId: 0 })
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: sortOrder })

    const totalProducts = await Product.countDocuments(query)
    const totalPages = Math.ceil(totalProducts / Number(limit))

    res.json({
      success: true,
      data: products,
      pagination: {
        totalItems: totalProducts,
        totalPages,
        currentPage: Number(page),
        itemsPerPage: Number(limit)
      },
      message: "All products fetched successfully (Admin)"
    })
  } catch (error) {
    next(error)
  }
}

// GET /api/products/:id
const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params

    const foundProduct = await Product.findById(id, { userId: 0 })
    if (!foundProduct) {
      return res.status(404).json({ success: false, error: "Product not found" })
    }

    res.json({ success: true, data: foundProduct })
  } catch (error) {
    next(error)
  }
}

// POST /api/products
const createProduct = async (req, res, next) => {
  try {
    const body = req.body
    const userLogged = req.userLogged

    const newProduct = await Product.create({
      name: body.name,
      price: body.price,
      category: body.category,
      stock: body.stock,
      available: body.stock > 0,
      userId: userLogged.id
    })

    const { userId, ...publicDataProduct } = newProduct.toObject()

    res.status(201).json({
      success: true,
      data: publicDataProduct,
      message: "Product created successfully"
    })
  } catch (error) {
    next(error)
  }
}

// PUT /api/products/:id
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body

    const updateData = { ...body }
    if (body.stock !== undefined) {
      updateData.available = body.stock > 0
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, projection: { userId: 0 } }
    )

    if (!updatedProduct) {
      return res.status(404).json({ success: false, error: "Product not found" })
    }

    res.json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully"
    })
  } catch (error) {
    next(error)
  }
}

// DELETE /api/products/:id
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params

    const deletedProduct = await Product.findByIdAndDelete(id)

    if (!deletedProduct) {
      return res.status(404).json({ success: false, error: "Product not found" })
    }

    const product = deletedProduct.toObject()
    delete product.userId

    res.json({ success: true, data: product, message: "Product deleted successfully" })
  } catch (error) {
    next(error)
  }
}

export { 
  getProducts, 
  getAllProductsAdmin, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct 
}