import { Router } from "express";
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo.controller.js";
import { verify } from "../utils/verify.js";

const router = Router();

router.post("/add", verify, addTodo);
router.get("/get", verify, getTodos);
router.delete("/delete/:todoId", verify, deleteTodo);
router.put("/update/:todoId", verify, updateTodo);

export default router;
