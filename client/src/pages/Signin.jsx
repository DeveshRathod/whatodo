import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userState } from "../store/userState";
import { useSetRecoilState } from "recoil";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useSetRecoilState(userState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setError("");
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setError("");
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/signin",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        localStorage.setItem("token", "Bearer " + response.data.token);
        setUser(response.data.user);
        setLoading(false);
        navigate("/");
      } else {
        setError("Invalid response data");
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customBg1">
      <div className="flex justify-center container mx-auto my-auto w-screen h-screen items-center flex-col">
        <div className="w-3/4 md:w-1/2 lg:w-1/3 flex flex-col items-center bg-slate-50 rounded-md pt-12">
          <div className="w-3/4 mb-6">
            <input
              type="email"
              name="email"
              id="email"
              className="w-full py-3 px-3 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
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
              className="w-full py-3 px-3 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="w-3/4 mb-12">
            <button
              type="submit"
              className="py-3 customBg3 w-full rounded text-blue-50 font-bold hover:opacity-95"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Loading..." : "LOGIN"}
            </button>
          </div>
          {/* Loading spinner */}
          {loading && (
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          {/* Error message */}
        </div>
        <div className="flex justify-center container mx-auto mt-6 text-slate-100 text-sm">
          <div className="flex gap-2">
            Don't have an account?
            <Link className=" hover:underline customText3" to="/signup">
              Get started
            </Link>
          </div>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
      </div>
    </div>
  );
};

export default Signin;
