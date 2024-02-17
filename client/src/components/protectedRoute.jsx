import { Navigate, Outlet } from "react-router-dom";
import { authState } from "../store/authState";
import { useRecoilValue } from "recoil";

const PrivateRoute = () => {
  const isAuth = useRecoilValue(authState);
  return isAuth ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
