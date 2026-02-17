import express from "express"
import ProductManager from "./managers/productManager.js"
import CartManager from "./managers/CartManager.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const productManager = new ProductManager();
const cartManager = new CartManager();


/* ================= PRODUCTOS ================= */

// GET trae  todos los productos
app.get("/api/products", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// GET trae producto por id
app.get("/api/products/:pid", async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.pid);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(product);
  } catch {
    res.status(500).json({ error: "Error al buscar producto" });
  }
});

// POST crear productooooooooooooooo
app.post("/api/products", async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT actualizar producto (sin modificar id)
app.put("/api/products/:pid", async (req, res) => {
  try {
    const updatedProduct = await productManager.updateProduct(
      req.params.pid,
      req.body
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* ================= CARRITO================= */

// POST crear carrito
app.post("/api/carts", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch {
    res.status(500).json({ error: "Error al crear carrito" });
  }
});

// GET carrito por id
app.get("/api/carts/:cid", async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cid);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    res.json(cart.products);
  } catch {
    res.status(500).json({ error: "Error al obtener carrito" });
  }
});

// POST agregar producto a carrito
app.post("/api/carts/:cid/product/:pid", async (req, res) => {
  try {
    const updatedCart = await cartManager.addProductToCart(
      req.params.cid,
      req.params.pid
    );

    if (!updatedCart) {
      return res
        .status(404)
        .json({ error: "Carrito o producto no encontrado" });
    }

    res.json(updatedCart);
  } catch {
    res.status(500).json({ error: "Error al agregar producto al carrito" });
  }
});


// DELETE borra producto de products no de carros
app.delete("/api/products/:pid", async (req, res) => {
  try {
    const deleted = await productManager.deleteProduct(req.params.pid);

    if (!deleted) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado correctamente" });
  } catch {
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

/* ================= SERViDOR ================= */

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

