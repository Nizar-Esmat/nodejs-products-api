import { Router } from "express";
import { create_db } from "./db.service.js";
const router = Router();

router.post('/create_database',  create_db);

export default router;