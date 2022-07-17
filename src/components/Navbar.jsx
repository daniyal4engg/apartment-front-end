import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <div>
      <h1>Navbar</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <Link to="/">Home</Link>
          <Link to="/flat">flat</Link>
        </div>

        <div style={{ display: "flex" }}>
          <Link to="/signup">signUp</Link>
          <Link to="/login">logIn</Link>
        </div>
      </div>
    </div>
  );
};
