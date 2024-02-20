// App.js
import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "./store/userState";
import { authState } from "./store/authState";
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
  const setUser = useSetRecoilState(userState);
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:4000/api/v1/user/me",
            {
              headers: {
                token: `${token}`,
              },
            }
          );

          const userData = response.data;
          setUser(userData);
          setAuth(true);
        } else {
          setAuth(false);
          setUser({});
          navigate("/signin");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        setAuth(false);
        setUser({});
      }
    };

    fetchUser();
  }, []);

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
