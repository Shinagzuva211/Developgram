import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ setIsAuthed }) {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsAuthed(false);
    navigate("/login/");
  }, [navigate, setIsAuthed]);

  return <h1>Chiqib ketilmoqda...</h1>;
}
