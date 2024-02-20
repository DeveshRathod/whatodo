// PrivateRoute.js
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../store/userState";
import axios from "axios";

const PrivateRoute = () => {
  const [user, setUser] = useRecoilState(userState);
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

          const userData = await response.data;
          setUser(userData);
        } else {
          setUser({});
          navigate("/signin");
        }
      } catch (error) {
        setUser({});
        navigate("/signin");
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUser();
  }, []);

  return user ? <Outlet /> : "";
};

export default PrivateRoute;
