import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRecoilValue } from "recoil";
import { userState } from "../store/userState";
import ChecklistIcon from "@mui/icons-material/Checklist";
import RuleIcon from "@mui/icons-material/Rule";

const Layout = ({ children }) => {
  const user = useRecoilValue(userState);

  return (
    <div className="flex flex-row w-full h-screen text-white">
      <div className="w-1/5 customBg1 flex p-4 sm:p-8 flex-col gap-4 sm:gap-10">
        <div className="text-green-500 font-bold text-xl sm:text-4xl self-center">
          WT
        </div>
        <div className="flex flex-col gap-4 sm:gap-8 mt-8">
          <NavLink
            to="/"
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
            <img
              src={user.avatar}
              alt="User"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
        </div>
        <div className="flex-grow customBg3 flex flex-col sm:w-full pt-10">
          <div className="h-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
