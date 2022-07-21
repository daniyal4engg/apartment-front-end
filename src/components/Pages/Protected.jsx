import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Protected = (prop) => {
  //   took home component as prop
  const navigate = useNavigate();
  const { component } = prop;
  useEffect(() => {
    const login = localStorage.getItem("login");
    if (!login) {
      navigate("/login");
    }
  });
  return (
    <div>
      <component />
    </div>
  );
};
