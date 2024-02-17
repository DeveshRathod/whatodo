import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userState } from "../store/userState";
import { useSetRecoilState } from "recoil";
import { authState } from "../store/authState";

const Signin = () => {
  const setIsAuth = useSetRecoilState(authState);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useSetRecoilState(userState);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/signin",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setIsAuth(true);
        setUser(response.data.user);
        navigate("/home");
      } else {
        console.error("Invalid response data");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="customBg1">
      <div className="flex justify-center container mx-auto my-auto w-screen h-screen items-center flex-col">
        <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col items-center bg-slate-50 rounded-md pt-12">
          {/* email input */}
          <div className="w-3/4 mb-6">
            <input
              type="email"
              name="email"
              id="email"
              className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          {/* password input */}
          <div className="w-3/4 mb-6">
            <input
              type="password"
              name="password"
              id="password"
              className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          {/* button */}
          <div className="w-3/4 mb-12">
            <button
              type="submit"
              className="py-4 customBg3 w-full rounded text-blue-50 font-bold hover:opacity-95"
              onClick={handleSubmit}
            >
              LOGIN
            </button>
          </div>
        </div>
        <div className="flex justify-center container mx-auto mt-6 text-slate-100 text-sm">
          <div className="flex gap-2">
            Don't have an account?
            <Link className=" hover:underline customText3" to="/signup">
              Get started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
