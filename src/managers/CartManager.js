import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

class CartManager {
  constructor() {
    this.path = "./carts.json";
  }

  async getCarts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find(c => c.id === id);
  }

  async createCart() {
    const carts = await this.getCarts();

    const newCart = {
      id: uuidv4(),
      products: []
    };

    carts.push(newCart);
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));

    return newCart;
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex(c => c.id === cartId);

    if (cartIndex === -1) return null;

    const productIndex = carts[cartIndex].products.findIndex(
      p => p.product === productId
    );

    if (productIndex !== -1) {
      carts[cartIndex].products[productIndex].quantity++;
    } else {
      carts[cartIndex].products.push({
        product: productId,
        quantity: 1
      });
    }

    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));

    return carts[cartIndex];
  }
}

export default CartManager;
