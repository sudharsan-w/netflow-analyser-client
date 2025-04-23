import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux_store/store";
import { useNavigate } from "react-router-dom";

import FlowPage from "../pages/FlowPage";
import UserPage from "../pages/UserPage";
import { LoginPage } from "../pages/LoginPage";
import { validateTokenThunk } from "../../redux_store/features/auth";

export default function () {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(validateTokenThunk())
  }, [])
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Navigate to={"/flows"} replace />} />
        <Route path={"/login"} element={!isAuthenticated ? <LoginPage /> : <Navigate to={ `/flows`} />} />
        <Route path={"/flows"} element={<FlowPage />} />
        <Route path={"/users"} element={<UserPage />} />
      </Routes>
    </>
  );
}
