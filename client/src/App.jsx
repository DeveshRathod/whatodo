// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import CreateTodo from "./pages/CreateTodo";
import UpdateTodo from "./pages/UpdateTodo";
import Not_Found from "./pages/Not-Found";
import PrivateRoute from "./components/ProtectedRoute";
import CompletedTodos from "./pages/CompletedTodos";
import IncompleteTodos from "./pages/IncompleteTodos";

const App = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/*" element={<Not_Found />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/complete" element={<CompletedTodos />} />
        <Route path="/incomplete" element={<IncompleteTodos />} />
        <Route path="/setting" element={<Settings />} />
        <Route path="/create" element={<CreateTodo />} />
        <Route path="/update/:todoId" element={<UpdateTodo />} />
      </Route>
    </Routes>
  );
};

export default App;
