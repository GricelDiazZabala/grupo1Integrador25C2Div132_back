import { Router } from "express";
const router = Router();

import {createSale ,getAllSales, getVentaById} from "../controllers/sales.controllers.js";

// POST /api/ventas para que el cliente haga una venta
router.post("/", createSale); 

// GET /api/ventas/:id para que el admin vea una venta por id
router.get("/:id", getVentaById)

// GET /api/ventas para que el admin vea todas las ventas
router.get("/", getAllSales);




// GET /api/ventas/excel para exportar todo a un excel
//router.get("/excel", getSalesExcel); todavia no esta hecho

export default router;