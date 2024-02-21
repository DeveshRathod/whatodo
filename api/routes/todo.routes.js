import { Router } from "express";
import {
  addTags,
  addTodo,
  deleteTodo,
  getTodos,
  removeTag,
  updateTodo,
} from "../controllers/todo.controller.js";
import { verify } from "../utils/verify.js";

const router = Router();

router.post("/add", verify, addTodo);
router.get("/get", verify, getTodos);
router.delete("/delete/:todoId", verify, deleteTodo);
router.put("/update/:todoId", verify, updateTodo);
router.put("/update/addtag/:todoId", verify, addTags);
router.put("/update/removetag/:todoId", verify, removeTag);

export default router;
