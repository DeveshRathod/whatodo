import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "./components/Loading";
import { userState } from "./store/userState";
import { authState } from "./store/authState";
import { useRecoilState, useSetRecoilState } from "recoil";

const Signin = lazy(() => import("./pages/Signin"));
const Home = lazy(() => import("./pages/Home"));
const Settings = lazy(() => import("./pages/Settings"));
const CreateTodo = lazy(() => import("./pages/CreateTodo"));
const UpdateTodo = lazy(() => import("./pages/UpdateTodo"));
const AllTodos = lazy(() => import("./pages/AllTodos"));
const Not_Found = lazy(() => import("./pages/Not-Found"));
const ProtectedRoute = lazy(() => import("./components/protectedRoute"));

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
    <Suspense
      fallback={
        <div>
          <Loading />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/*" element={<Not_Found />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/all" element={<AllTodos />} />
          <Route path="/setting/:userId" element={<Settings />} />
          <Route path="/create/:userId" element={<CreateTodo />} />
          <Route path="/update/:todoId" element={<UpdateTodo />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
