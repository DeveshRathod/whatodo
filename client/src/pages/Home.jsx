import React from "react";
import { userState } from "../store/userState";
import { useRecoilState } from "recoil";

const Home = () => {
  const [user, setUser] = useRecoilState(userState);
  console.log(user);

  return <div>Home</div>;
};

export default Home;
