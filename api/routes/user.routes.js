import { Router } from "express";
import { checkme, signIn, signUp } from "../controllers/user.controller.js";
import { verify } from "../utils/verify.js";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/me", verify, checkme);

export default router;
