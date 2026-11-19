import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Header";

export default function Logout({ setIsAuthed }) {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsAuthed(false);
    const timer = setTimeout(() => navigate("/login/", { replace: true }), 700);
    return () => clearTimeout(timer);
  }, [navigate, setIsAuthed]);

  return (
    <>
      <Header />

      <div className="page container">
        <div className="card center-card fade-in">
          <span className="spinner" aria-hidden="true" />
          <h1>Chiqib ketilmoqda...</h1>
          <p className="muted">Siz kirish sahifasiga yo'naltirilasiz.</p>
        </div>
      </div>
    </>
  );
}
