import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "./context/authProvider";

import Login from "./pages/Login";
import Select from "./pages/Select";
import Confirm from "./pages/Confirm";
import Result from "./pages/Result";
import Submitted from "./pages/Submitted";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/select"
          element={
            <ProtectedRoute>
              <Select />
            </ProtectedRoute>
          }
        />
        <Route
          path="/confirm"
          element={
            <ProtectedRoute>
              <Confirm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/submitted"
          element={
            <ProtectedRoute>
              <Submitted />
            </ProtectedRoute>
          }
        />
        <Route
          path="/result"
          element={
            <ProtectedRoute adminOnly={true}>
              <Result />
            </ProtectedRoute>
          }
        />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
