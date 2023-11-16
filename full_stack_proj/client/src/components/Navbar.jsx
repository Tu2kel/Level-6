import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const { logout } = props;
  return (
    <div className="navbar">
      <Link to="/profile" className="nav_link profiles">
        Profile
      </Link>
      <Link to="/public" className="nav_link publics">
        Public Posts{" "}
      </Link>
      <h6 onClick={logout} className="nav_link logouts">
        Logout
      </h6>
    </div>
  );
}
