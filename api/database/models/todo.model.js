import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  status: {
    type: String,
    enum: ["pending", "inProgress", "completed"],
    default: "pending",
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
