import { Router } from "express"
import { products } from "../data/products.js"
const router = Router()


router.post("/", (req, res) => {

  const newProduct = {
    id: products.length + 1,
    nombre: req.body.nombre,
    precio: req.body.precio
  }

  products.push(newProduct)

  const io = req.app.get("io")
  io.emit("updateProducts", products)

  res.json(newProduct)

})

router.delete("/:id", (req, res) => {

  const { id } = req.params

  const index = products.findIndex(p => p.id === parseInt(id))

  if(index === -1){
    return res.status(404).json({ message: "Product not found" })
  }

  products.splice(index,1)

  const io = req.app.get("io")
  io.emit("updateProducts", products)

  res.json({ message: "Producto eliminado" })

})

export default router