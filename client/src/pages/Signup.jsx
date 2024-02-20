import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userState } from "../store/userState";
import { useSetRecoilState } from "recoil";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const setUser = useSetRecoilState(userState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/signup",
        {
          username: username,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        }
      );
      if (response.data.token) {
        localStorage.setItem("token", "Bearer " + response.data.token);
        setLoading(false);
        navigate("/");
        setUser(response.data.user);
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setError("Error Signing Up");
      }
    } catch (error) {
      setError("Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customBg1">
      <div className="flex justify-center container mx-auto my-auto w-screen h-screen items-center flex-col">
        <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col items-center bg-slate-50 rounded-md pt-12">
          <div className="w-3/4 mb-6">
            <input
              type="text"
              name="username"
              id="username"
              className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
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
          <div className="w-3/4 mb-6">
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <div className="w-3/4 mb-12">
            <button
              type="submit"
              className="py-4 customBg3 w-full rounded text-blue-50 font-bold hover:opacity-95"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Loading..." : "SIGN UP"}
            </button>
          </div>
        </div>
        <div className="flex justify-center container mx-auto mt-6 text-slate-100 text-sm">
          <div className="flex gap-2">
            Already have an account?
            <Link className="hover:underline customText3" to="/signin">
              Login
            </Link>
          </div>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
      </div>
    </div>
  );
};

export default Signup;
