import "../../src/styles/Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "./Context/Auth";
// import { Navigate,useNavigate } from "react";
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handlelogout = () => {
    auth.logout();
    navigate("/");
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "black",
          color: "white",
          alignItems: "center",
          fontSize: "27px",
          borderBottom: "5px solid DarkGray",
          fontWeight: "bold",
          height: "65px",
        }}
      >
        <div>
          <Link to="/" style={{ marginRight: "50px" }}>
            Home
          </Link>
          <Link to="/flat">Flat</Link>
        </div>

        <div>
          <Link to="/signup" style={{ marginRight: "50px" }}>
            SignUp
          </Link>

          {!auth.user ? (
            <Link to="/login">LogIn</Link>
          ) : (
            <button onClick={handlelogout}>Logout</button>
          )}
        </div>
      </div>
    </div>
  );
};
