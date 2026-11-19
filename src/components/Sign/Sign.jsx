import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  IoArrowForward,
  IoEye,
  IoEyeOff,
  IoLockClosed,
  IoMail,
  IoPerson,
} from "react-icons/io5";
import "./Sign.css";

export default function Sign({ setIsAuthed }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isRegister = pathname === "/register/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const displayName = (isRegister ? name : email.split("@")[0]).trim();
    if (!displayName) {
      setError("Ism yoki email to'g'ri kiritilmadi.");
      return;
    }
    if (password.length < 6) {
      setError("Parol kamida 6 ta belgidan iborat bo'lishi kerak.");
      return;
    }
    if (isRegister && password !== confirm) {
      setError("Parollar mos kelmadi.");
      return;
    }

    localStorage.setItem("userName", displayName);
    setIsAuthed(true);
    navigate("/index/", { replace: true });
  };

  return (
    <main className="auth">
      <section className="auth__brand" aria-hidden="true">
        <div className="auth__glow" />
        <div className="auth__brand-inner">
          <img src="/logo.png" alt="" className="auth__logo" />
          <h1>
            <span>Developgram</span>
          </h1>
          <p>
            Dasturchilar uchun yaratilgan ijtimoiy makon. Hikoyalaringizni
            ulashing, yangiliklarni kuzating va suhbatlashing.
          </p>
          <ul className="auth__features">
            <li>Qisqa videolar va ilhomlantiruvchi kontent</li>
            <li>Real vaqtda suhbat va kontaktlar</li>
            <li>Shaxsiy profil va sozlamalar</li>
          </ul>
        </div>
      </section>

      <section className="auth__panel">
        <div className="auth__card fade-in">
          <img src="/logo.png" alt="" className="auth__mobile-logo" />

          <div className="auth__tabs" role="tablist" aria-label="Autentifikatsiya">
            <Link
              to="/login/"
              role="tab"
              aria-selected={!isRegister}
              className={`auth__tab ${!isRegister ? "is-active" : ""}`}
            >
              Kirish
            </Link>
            <Link
              to="/register/"
              role="tab"
              aria-selected={isRegister}
              className={`auth__tab ${isRegister ? "is-active" : ""}`}
            >
              Ro'yxatdan o'tish
            </Link>
          </div>

          <div className="auth__intro">
            <h2>{isRegister ? "Hisob yarating" : "Xush kelibsiz!"}</h2>
            <p className="muted">
              {isRegister
                ? "Boshlash uchun ma'lumotlaringizni kiriting."
                : "Hisobingizga kirish uchun ma'lumotlaringizni kiriting."}
            </p>
          </div>

          <form className="auth__form" onSubmit={handleSubmit} noValidate>
            {isRegister && (
              <div className="field">
                <label className="field-label" htmlFor="name">
                  Ismingiz
                </label>
                <div className="input-affix">
                  <IoPerson className="input-affix__icon" size={19} />
                  <input
                    id="name"
                    className="input"
                    type="text"
                    autoComplete="name"
                    placeholder="Ismingiz"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="field">
              <label className="field-label" htmlFor="email">
                Email
              </label>
              <div className="input-affix">
                <IoMail className="input-affix__icon" size={19} />
                <input
                  id="email"
                  className="input"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="field-label" htmlFor="password">
                Parol
              </label>
              <div className="input-affix">
                <IoLockClosed className="input-affix__icon" size={19} />
                <input
                  id="password"
                  className="input"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isRegister ? "new-password" : "current-password"}
                  placeholder="Kamida 6 ta belgi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="input-affix__action"
                  onClick={() => setShowPassword((show) => !show)}
                  aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                >
                  {showPassword ? <IoEyeOff size={19} /> : <IoEye size={19} />}
                </button>
              </div>
            </div>

            {isRegister && (
              <div className="field">
                <label className="field-label" htmlFor="confirm">
                  Parolni tasdiqlang
                </label>
                <div className="input-affix">
                  <IoLockClosed className="input-affix__icon" size={19} />
                  <input
                    id="confirm"
                    className="input"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Parolni qayta kiriting"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="btn btn--primary btn--block">
              {isRegister ? "Hisob yaratish" : "Kirish"}
              <IoArrowForward size={18} />
            </button>
          </form>

          <p className="auth__switch form-hint">
            {isRegister ? "Allaqachon hisobingiz bormi?" : "Hisobingiz yo'qmi?"}{" "}
            <Link to={isRegister ? "/login/" : "/register/"}>
              {isRegister ? "Kiring" : "Ro'yxatdan o'ting"}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
