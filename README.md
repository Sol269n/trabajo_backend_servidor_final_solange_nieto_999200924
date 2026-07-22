# API REST Backend — Gestión de Productos

API RESTful modular construida con Node.js, Express y MongoDB Atlas para la gestión integral de un catálogo de productos. El sistema cuenta con autenticación segura basada en JWT, control de acceso por roles (RBAC), validaciones rigurosas mediante Zod y arquitectura MVC.

---

## 🚀 Características Principales

- **Autenticación y Seguridad:** Registro e inicio de sesión con hash de contraseñas (`bcryptjs`) y tokens JWT.
- **Jerarquía de Roles (RBAC):** Restricciones de acceso para rol `user` (gestión de productos propios) y `admin` (acceso y control global).
- **Validación de Datos:** Esquemas desacoplados con `Zod` para garantizar datos limpios en cada request.
- **Consultas Avanzadas:** Paginación (`page`, `limit`), ordenamiento dinámico (`sort`) y filtros por búsqueda o categoría en `GET /api/products`.
- **Manejo Centralizado de Errores:** Middleware global para captura de excepciones y errores de sintaxis o ID inválidos.

---

## 🛠️ Tecnologías

- **Entorno de Ejecución:** Node.js
- **Framework Backend:** Express.js
- **Base de Datos:** MongoDB Atlas (Mongoose ODM)
- **Seguridad:** JSON Web Token (JWT) & Bcryptjs
- **Validación:** Zod
- **Variables de Entorno:** Dotenv

---

## 📂 Estructura del Proyecto

```text
trabajo_backend_servidor_final_solange_nieto_999200924/
├── src/
│   ├── config/          # Conexión a MongoDB Atlas
│   ├── controllers/     # Lógica de negocio (authControllers.js, productControllers.js)
│   ├── middlewares/     # Auth JWT, validación Zod, roles y ownership
│   ├── models/          # Modelos de datos Mongoose (UserModel.js, ProductModel.js)
│   ├── routes/          # Definición de rutas (authRouter.js, productRouter.js)
│   ├── schemas/         # Validación de esquemas de entrada Zod
│   └── app.js           # Configuración del servidor Express y middlewares
├── .env                 # Variables de entorno (privado)
├── .env.example         # Plantilla de configuración de entorno
└── package.json

⚙️ Configuración e Instalación1. Requisitos previosTener instalado Node.js (v18+) y una cuenta activa en MongoDB Atlas.2. Pasos de instalaciónClonar el repositorio:Bashgit clone [https://github.com/Sol269n/trabajo_backend_servidor_final_solange_nieto_999200924.git](https://github.com/Sol269n/trabajo_backend_servidor_final_solange_nieto_999200924.git)
cd trabajo_backend_servidor_final_solange_nieto_999200924
Instalar dependencias:Bashnpm install
Configurar el entorno:Creá un archivo .env en la raíz tomando de referencia .env.example:Fragmento de códigoPORT=3000
JWT_SECRET=tu_clave_secreta
URI_DB=TU_STRING_DE_CONEXION_MONGODB_ATLAS
Iniciar el servidor:Bashnpm run dev
📌 Guía de Endpoints🔐 Autenticación (/api/auth)MétodoEndpointDescripciónPermisosPOST/api/auth/registerCrea un nuevo usuario en el sistemaPúblicoPOST/api/auth/loginInicia sesión y devuelve un token JWTPúblicoEjemplo de Body (POST /api/auth/register):JSON{
  "username": "SolangeNieto",
  "email": "solange@example.com",
  "password": "Password123!",
  "role": "user"
}
📦 Productos (/api/products)Nota: Todos los endpoints de productos requieren la cabecera:Authorization: Bearer <TOKEN_JWT>MétodoEndpointDescripciónPermisosGET/api/productsObtiene productos con paginación, filtros y sortuser (propios) / admin (todos)GET/api/products/allLista la totalidad de productos del sistemaSolo adminGET/api/products/:idObtiene un producto por su IDPropietario / adminPOST/api/productsCrea un nuevo productouser / adminPUT/api/products/:idModifica un producto existentePropietario / adminDELETE/api/products/:idElimina un producto por su IDPropietario / admin🔍 Ejemplos de Parámetros de Consulta (Query Params)El endpoint GET /api/products soporta parámetros opcionales para personalizar las búsquedas:Paginación: ?page=1&limit=5Filtro por Categoría: ?category=hardwareBúsqueda por Nombre: ?search=tecladoOrdenamiento: ?sort=asc o ?sort=descPetición de ejemplo:HTTPGET /api/products?page=1&limit=10&sort=asc&category=perifericos HTTP/1.1
Host: localhost:3000
Authorization: Bearer <TU_TOKEN_JWT>

---

### 🔄 Subir la corrección a GitHub

Una vez guardado el archivo en VS Code, ejecutá en la terminal:

```bash
git add README.md
git commit -m "docs: fix readme formatting and sanitize db uri"
git push