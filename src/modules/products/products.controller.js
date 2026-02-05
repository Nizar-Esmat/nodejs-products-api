import { Router } from "express";
import { addProduct  ,deleteProduct, getAllProducts, getMaxPrice, getProductsIn, getProductsOwner, getTopfiveProducts, searchProducts } from "./products.service.js";

const router = Router();

// o URL: POST /products
router.post("/", addProduct)

// URL: DELETE /products/:id
router.delete("/:id", deleteProduct)


// URL: GET /products/search (for example => /products/search?name=phone)
router.get("/search",searchProducts )


// URL: GET /products/in (for example => /products/in?ids=1,3)
router.get("/in", getProductsIn)

// URL: GET /products
router.get("/",getAllProducts )

//  GET /products/products-with-users
router.get("/products-with-users", getProductsOwner)

// URL: GET /products/max-price
router.get("/max-price", getMaxPrice)

// URL: GET /products/top-5-expensive
router.get("/top-5-expensive", getTopfiveProducts)

export default router;