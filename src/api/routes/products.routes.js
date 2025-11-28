import { Router } from "express";
const router = Router();

import { validateId } from "../middlewares/middlewares.js";
import { createProduct, getAllProducts, getProductById, modifyProduct, removeProduct } from "../controllers/product.controllers.js";
import { multerUploader } from "../middlewares/multer.middlewares.js";
import { handleMulterError } from "../middlewares/multer.middlewares.js";

// Definición de rutas para productos
router.get("/", getAllProducts);

router.get("/:id", validateId , getProductById);

//crear un nuevo producto y subir imagen
router.post("/", multerUploader.single("image"), handleMulterError, createProduct);
router.put("/", multerUploader.single("image"), handleMulterError, modifyProduct);


router.delete("/:id", validateId, removeProduct);

export default router;