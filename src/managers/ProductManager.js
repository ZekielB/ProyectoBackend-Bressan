import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

class ProductManager {
  constructor() {
    this.path = "./products.json";
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find(p => p.id === id);
  }

  async addProduct(product) {
    const products = await this.getProducts();

    const newProduct = {
      id: uuidv4(),
      ...product
    };

    products.push(newProduct);
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));

    return newProduct;
  }

async updateProduct(id, updatedFields) {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    delete updatedFields.id;

    if (
      updatedFields.code &&
      products.some(p => p.code === updatedFields.code && p.id !== id)
    ) {
      throw new Error("El código ya existe");
    }

    products[index] = { ...products[index], ...updatedFields };

    await fs.writeFile(this.path, JSON.stringify(products, null, 2));

    return products[index];
  }

async deleteProduct(id) {
  const products = await this.getProducts();

  const exists = products.some(p => p.id === id);
  if (!exists) return null;

  const filteredProducts = products.filter(p => p.id !== id);

  await fs.writeFile(this.path, JSON.stringify(filteredProducts, null, 2));

  return true;
}






}

export default ProductManager;

