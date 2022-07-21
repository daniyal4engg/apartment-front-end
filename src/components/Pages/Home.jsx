import "../../styles/home.css";
import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <div className="backgroundImageHome center">
      <h1 className="heading">Apartment Management System</h1>

      <button
        style={{
          backgroundColor: "black",
          color: "PaleTurquoise",
          margin: "auto",
          padding: "10px",
          borderRadius: "5px",
          marginTop: "20px",
        }}
      >
        <Link to="/flatform">click to add flat</Link>
      </button>
    </div>
  );
};
