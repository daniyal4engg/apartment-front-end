import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <div>
      <h1>HOME PAGE</h1>
      <Link to="/flatform">
        <button>click to add flat</button>
      </Link>
    </div>
  );
};
