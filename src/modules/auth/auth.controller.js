import { Router } from "express";
import { signUp  ,login} from "./auth.service.js";
const router = Router();
//o URL: POST /user/signup
router.post('/signup' ,  signUp);

//URL: POST /user/login
router.post('/login' , login );

export default router;