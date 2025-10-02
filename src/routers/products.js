import { Router } from "express";
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/products.js";

const productRouter = Router();

// Danh sách sản phẩm
productRouter.get('/', getProducts);

// Danh sách sản phẩm tìm theo id
productRouter.get('/:id', getProductById);

// Thêm sản phẩm
productRouter.post('/', addProduct);

// Cập nhật sản phẩm
productRouter.put('/:id', updateProduct);

// Xóa sản phẩm
productRouter.delete('/:id', deleteProduct);

export default productRouter;