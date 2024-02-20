// PrivateRoute.js
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authState } from "../store/authState";
import { userState } from "../store/userState";
import axios from "axios";

const PrivateRoute = ({ element }) => {
  const setUser = useSetRecoilState(userState);
  const [isAuth, setAuth] = useRecoilState(authState);
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

  return isAuth ? <Outlet /> : "";
};

export default PrivateRoute;
