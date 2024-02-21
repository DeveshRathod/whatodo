import Todo from "../database/models/todo.model.js";

export const addTodo = async (req, res) => {
  try {
    const { title, description, priority, dueDate, tags } = req.body;
    const userId = req.user.userId;
    if (userId === undefined) {
      res.status(404).json({ message: "User Not Found" });
    }

    if (
      title === undefined ||
      description === undefined ||
      tags.length === 0 ||
      dueDate === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const todo = new Todo({
      title: title,
      description: description,
      priority: priority,
      dueDate: dueDate,
      tags: tags,
      createdBy: userId,
    });

    await todo.save();

    res.status(201).json({ message: "Todo added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getTodos = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (userId === undefined) {
      res.status(404).json({ message: "User Not Found" });
    }
    const todos = await Todo.find({ createdBy: userId });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (userId === undefined) {
      res.status(404).json({ message: "User Not Found" });
    }
    const todoId = req.params.todoId;
    if (todoId === undefined) {
      res.status(404).json({ message: "Todo Not Found" });
    }
    const todo = await Todo.findOneAndDelete({ _id: todoId });
    if (!todo) {
      res.status(404).json({ message: "Todo Not Found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateTodo = async (req, res) => {
  const userId = req.user.userId;
  const todoId = req.params.todoId;

  try {
    if (!userId) {
      return res.status(404).json({ message: "User Not Found" });
    }
    if (!todoId) {
      return res.status(404).json({ message: "Todo Not Found" });
    }

    const { title, description, priority, dueDate } = req.body;

    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({ message: "Todo Not Found" });
    }

    if (title) {
      todo.title = title;
    }
    if (description) {
      todo.description = description;
    }
    if (priority) {
      todo.priority = priority;
    }
    if (dueDate) {
      todo.dueDate = dueDate;
    }

    await todo.save();

    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addTags = async (req, res) => {
  const todoId = req.params.todoId;
  const { tags } = req.body;

  try {
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({ message: "Todo Not Found" });
    }

    if (typeof tags !== "string" || tags.trim() === "") {
      return res
        .status(400)
        .json({ message: "Tags must be provided as a non-empty string" });
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim());

    if (tagsArray.length === 0) {
      return res
        .status(400)
        .json({ message: "Tags must be provided as a non-empty string" });
    }

    todo.tags.push(...tagsArray);
    await todo.save();

    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeTag = async (req, res) => {
  const todoId = req.params.todoId;
  const { tags } = req.body;

  try {
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({ message: "Todo Not Found" });
    }

    if (!Array.isArray(tags) || tags.length === 0) {
      return res
        .status(400)
        .json({ message: "Tags must be provided as a non-empty array" });
    }

    tags.forEach((tagToRemove) => {
      const index = todo.tags.indexOf(tagToRemove);
      if (index !== -1) {
        todo.tags.splice(index, 1);
      }
    });

    await todo.save();

    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
