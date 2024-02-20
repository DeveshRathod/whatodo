import React, { useState } from "react";
import Layout from "../components/SettingsLayout";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "../store/userState";
import { authState } from "../store/authState";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [user, setUser] = useRecoilState(userState);
  const setIsAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    password: "",
  });

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, avatar: reader.result });
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
      console.log(user);
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
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:4000/api/v1/user/delete`, {
        method: "DELETE",
        headers: {
          token: `${token}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to Delete user: ${errorMessage}`);
      }

      const Deleted = await response.json();
      setUser({});
      setIsAuth(false);
      navigate("/");
    } catch (error) {
      throw error;
    }
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
          <div className=" flex justify-between w-full">
            <button
              className="py-3 px-5 sm:px-8  bg-red-500 rounded-lg hover:opacity-95"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="py-3 px-5 sm:px-8  bg-green-500 rounded-lg hover:opacity-95"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
