import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import Public from "./components/Public";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserContext } from "./context/UserProvider";

export default function App() {
  const { token, logout } = useContext(UserContext);
  return (
    <div className="app">
      <div className="">
        {token && <Navbar logout={logout} />}
        {/*if token true render Navbar with logout*/}
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/profile" /> : <Auth />}
          />
          {/* If user has a token redirect to the '/profile'
        route. If not, render the 'Auth' component  */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute token={token}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/public"
            element={
              <ProtectedRoute token={token}>
                <Public />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
