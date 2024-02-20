import { Router } from "express";
import {
  checkme,
  deleteUser,
  signIn,
  signUp,
  updateUser,
} from "../controllers/user.controller.js";
import { verify } from "../utils/verify.js";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/me", verify, checkme);
router.put("/update", verify, updateUser);
router.delete("/delete", verify, deleteUser);

export default router;
