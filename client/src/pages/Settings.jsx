import React, { useState, useEffect } from "react";
import Layout from "../components/SettingsLayout";
import { useRecoilState } from "recoil";
import { userState } from "../store/userState";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [user, setUser] = useRecoilState(userState);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: user.username || "",
    email: user.email || "",
    avatar: user.avatar || "",
    password: "",
  });

  useEffect(() => {
    setFormData({
      username: user.username || "",
      email: user.email || "",
      avatar: user.avatar || "",
      password: "",
    });
  }, [user]);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, avatar: reader.result });
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const filteredData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== "")
      );

      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:4000/api/v1/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
        body: JSON.stringify(filteredData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to update user: ${errorMessage}`);
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setText("User updated");

      setTimeout(() => {
        setText("");
      }, 2000);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser({});
    navigate("/signin");
  };

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="w-fit sm:w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Settings</h1>
          <div className="flex justify-center mb-4">
            <label htmlFor="avatarInput">
              <img
                src={user.avatar}
                alt="User"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full cursor-pointer object-cover"
              />
            </label>
            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="text-white bg-gray-800 px-6 py-2 rounded-md w-full mt-2 text-sm sm:text-base"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="text-white bg-gray-800 px-6 py-2 rounded-md w-full mt-2 text-sm sm:text-base"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="text-white bg-gray-800 px-6 py-2 rounded-md w-full mt-2 text-sm sm:text-base"
            />
          </div>

          <div className=" flex justify-between w-full items-center pt-3">
            <div className=" text-xs sm:text-xl customText2">{text}</div>
            <button
              className="py-1 sm:py-2 px-5 sm:px-8  customBg4 rounded-lg hover:opacity-95"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>

          <div className=" flex items-center justify-center pt-3">
            <button onClick={logout} className="  customText1">
              <LogoutIcon /> Logout
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
