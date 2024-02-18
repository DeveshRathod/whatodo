import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRecoilState } from "recoil";
import { userState } from "../store/userState";
import ChecklistIcon from "@mui/icons-material/Checklist";
import RuleIcon from "@mui/icons-material/Rule";
import Filter from "./Filter";

const Layout = ({ children }) => {
  const [user, setUser] = useRecoilState(userState);

  return (
    <div className="flex flex-row w-full h-screen text-white">
      <div className="w-1/5 customBg1 flex p-4 sm:p-8 flex-col gap-4 sm:gap-10">
        <div className="text-green-500 font-bold text-xl sm:text-4xl self-center">
          WT
        </div>
        <div className="flex flex-col gap-4 sm:gap-8 mt-8">
          <NavLink
            to="/home"
            className="py-2 sm:py-3 px-4 sm:px-6 rounded-xl customBg2 flex items-center justify-center sm:justify-start gap-1"
            activeclassname="active"
          >
            <HomeIcon style={{ fontSize: 24 }} />
            <span className="hidden sm:inline text-sm">Home</span>
          </NavLink>
          <NavLink
            to="/create"
            className="py-2 sm:py-3 px-4 sm:px-6 rounded-xl customBg2 flex items-center justify-center sm:justify-start gap-1"
            activeclassname="active"
          >
            <AddIcon style={{ fontSize: 24 }} />
            <span className="hidden sm:inline text-sm">Add</span>
          </NavLink>
          <NavLink
            to="/complete"
            className="py-2 sm:py-3 px-4 sm:px-6 rounded-xl customBg2 flex items-center justify-center sm:justify-start gap-1"
            activeclassname="active"
          >
            <ChecklistIcon style={{ fontSize: 24 }} />
            <span className="hidden sm:inline text-sm">Completed</span>
          </NavLink>
          <NavLink
            to="/incomplete"
            className="py-2 sm:py-3 px-4 sm:px-6 rounded-xl customBg2 flex items-center justify-center sm:justify-start gap-1"
            activeclassname="active"
          >
            <RuleIcon style={{ fontSize: 24 }} />
            <span className="hidden sm:inline text-sm">Incomplete</span>
          </NavLink>
          <NavLink
            to="/setting"
            className="py-2 sm:py-3 px-4 sm:px-6 rounded-xl customBg2 flex items-center justify-center sm:justify-start gap-1"
            activeclassname="active"
          >
            <SettingsIcon style={{ fontSize: 24 }} />
            <span className="hidden sm:inline text-sm">Settings</span>
          </NavLink>
        </div>
      </div>
      <div className="flex flex-col w-4/5">
        <div className="h-20 customBg2 flex p-3 justify-end pr-6">
          <div>
            <img src={user.avatar} alt="User" className="w-12 rounded-full" />
          </div>
        </div>
        <div className="flex-grow customBg3 flex flex-col sm:w-full">
          <div className="h-25 sm:h-20">
            <div className="flex justify-between items-center p-1 sm:p-4  flex-col sm:flex-row-reverse">
              <div>
                <input
                  type="text"
                  className="text-white bg-gray-800 px-6 py-2 rounded-md w-full sm:w-auto mt-2 sm:mt-0 text-sm sm:text-base"
                  placeholder="Search..."
                />
              </div>
              <div className=" flex gap-4">
                <div>
                  <select className="text-white bg-gray-800 px-2 py-2 rounded-md sm:w-auto mt-2 sm:mt-0 text-sm sm:text-base">
                    <option value="">Order</option>
                    <option value="filter1">ASCE</option>
                    <option value="filter2">DSCE</option>
                  </select>
                </div>
                <div>
                  <select className="text-white bg-gray-800 px-4 py-2 rounded-md sm:w-auto mt-2 sm:mt-0 text-sm sm:text-base">
                    <option value="">Priority</option>
                    <option value="filter1">Low</option>
                    <option value="filter2">Medium</option>
                    <option value="filter3">High</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="h-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
