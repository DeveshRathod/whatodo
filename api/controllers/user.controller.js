import User from "../database/models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//signup controller
export const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign(
      {
        userId: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//signin controller
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const userWithoutSensitiveData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
    };

    res.json({ user: userWithoutSensitiveData, token });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//check controller
export const checkme = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findOne({ _id: userId }, { password: 0, todo: 0 });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//update user
// update user controller
export const updateUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    const updatedData = {};
    for (const key in req.body) {
      if (key === "password" && req.body[key]) {
        updatedData[key] = await bcrypt.hash(req.body[key], 10);
      } else if (req.body[key] !== "") {
        updatedData[key] = req.body[key];
      }
    }

    const user = await User.findOneAndUpdate({ _id: userId }, updatedData, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findOneAndDelete({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
