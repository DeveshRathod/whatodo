import jwt from "jsonwebtoken";
import errorHandler from "./error.js";

export const verify = (req, res, next) => {
  const rawToken = req.headers.token;
  const token = rawToken.split(" ")[1];

  if (!token) return next(errorHandler(401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return;

    req.user = user;
    next();
  });
};
