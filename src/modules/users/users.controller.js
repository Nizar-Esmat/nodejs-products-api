import { Router } from "express";
import { alterable, clearTable } from "./user.service.js";
const router = Router();

// URL: POST /user/alter-table
router.post("/alter-table", alterable);

router.post("/clear-table", clearTable);
export default router;