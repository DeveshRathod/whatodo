import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userState } from "./store/userState";
import { authState } from "./store/authState";
import { useRecoilState, useSetRecoilState } from "recoil";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import CreateTodo from "./pages/CreateTodo";
import UpdateTodo from "./pages/UpdateTodo";
import Not_Found from "./pages/Not-Found";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const setUser = useSetRecoilState(userState);
  const [isAuth, setIsAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = "Bearer " + localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/me",
          {
            headers: {
              token: token,
            },
          }
        );

        if (response.data) {
          setUser(response.data);
          setIsAuth(true);
        } else {
          setIsAuth(false);
          setUser({});
          navigate("/");
        }
      } catch (error) {
        setIsAuth(false);
      } finally {
        if (isAuth) {
          navigate("/home");
        }
      }
    };

    fetchUser();
  }, [isAuth]);

  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/*" element={<Not_Found />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/setting" element={<Settings />} />
        <Route path="/create" element={<CreateTodo />} />
        <Route path="/update/:todoId" element={<UpdateTodo />} />
      </Route>
    </Routes>
  );
};

export default App;
