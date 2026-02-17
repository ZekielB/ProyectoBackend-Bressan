# Backend Ecommerce - API con Express

## 📌 Descripción

Este proyecto es un servidor backend desarrollado con **Node.js** y **Express** que permite gestionar:

* **Productos**
* **Carritos de compra**

La información se guarda en archivos JSON 

El servidor corre en:

```
http://localhost:8080
```

---

## 🚀 Cómo ejecutar el proyecto

1. Instalar dependencias:

```
npm install
```

2. Iniciar el servidor:

```
node server.js
```

3. Abrir Postman y probar las rutas en:

```
http://localhost:8080
```

---

## 📦 Endpoints de Productos `/api/products`

### GET `/`

Obtiene todos los productos.

---

### GET `/:pid`

Obtiene un producto por su ID.

---

### POST `/`

Crea un nuevo producto.

**Body JSON ejemplo:**

```json
{
  "title": "Producto ejemplo",
  "description": "Descripción del producto",
  "code": "ABC123",
  "price": 1000,
  "status": true,
  "stock": 10,
  "category": "general",
  "thumbnails": []
}
```

**Notas:**

* El **id** se genera automáticamente con UUID.
* No se debe enviar el id en el body.

---

### PUT `/:pid`

Actualiza un producto existente **sin modificar el id**.

---

### DELETE `/:pid`

Elimina un producto por su ID.

---

## 🛒 Endpoints de Carritos `/api/carts`

### POST `/`

Crea un nuevo carrito.

**Estructura del carrito:**

```json
{
  "id": "autogenerado",
  "products": []
}
```

---

### GET `/:cid`

Obtiene los productos de un carrito específico.

---

### POST `/:cid/product/:pid`

Agrega un producto al carrito.

**Comportamiento:**

* Si el producto **no existe** en el carrito → se agrega con:

```json
{
  "product": "pid",
  "quantity": 1
}
```

* Si el producto **ya existe** → se incrementa `quantity`.

---

## 🧰 Tecnologías utilizadas

* Node.js
* Express
* UUID
* FS (File System)
* Postman para pruebas

---

## 📁 Estructura del proyecto

```
/managers
  ├── ProductManager.js
  ├── CartManager.js
/server.js
/package.json
/products.json
/carts.json
```

---

## 👨‍💻 Autor
Alumno: Ezequiel Bressan
Proyecto realizado como entrega del curso de **Programación Backend I: Desarrollo Avanzado de Backend** Profesor: Mauricio Di Pietro
