import "../../src/styles/Navbar.css";
import { Link } from "react-router-dom";
import { Wrap } from "@chakra-ui/react";
export const Navbar = () => {
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
          <Link to="/" style={{ marginRight: "15px" }}>
            Home
          </Link>
          <Link to="/flat">flat</Link>
        </div>

        <div>
          <Link to="/signup" style={{ marginRight: "15px" }}>
            signUp
          </Link>
          <Link to="/login">logIn</Link>
        </div>
      </div>
    </div>
  );
};
