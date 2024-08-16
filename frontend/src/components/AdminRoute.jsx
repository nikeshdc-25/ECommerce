import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminRouter() {
  const { userInfo } = useSelector((state) => state.auth);

  return (userInfo && userInfo.isAdmin) ? <Outlet /> : <Navigate to="/login" />;
}

export default AdminRouter;
