import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  IoClose,
  IoLogOut,
  IoMenu,
  IoMoon,
  IoSunny,
} from "react-icons/io5";
import { ThemeContext } from "./ThemeContext";

const navItems = [
  { to: "/index/", label: "Bosh sahifa", end: true },
  { to: "/about/", label: "Biz haqimizda" },
  { to: "/contact/", label: "Kontakt" },
  { to: "/profile/", label: "Profil" },
];

export default function Header() {
  const { isLight, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const user = localStorage.getItem("userName") || "Mehmon";

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header">
      <div className="container header-content">
        <NavLink className="brand" to="/index/" aria-label="Developgram bosh sahifa">
          <img src="/logo.png" alt="" />
          <span>Developgram</span>
        </NavLink>

        <nav
          className={`main-nav ${menuOpen ? "" : "main-nav--closed"}`}
          aria-label="Asosiy navigatsiya"
        >
          {navItems.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="btn--icon"
            onClick={toggleTheme}
            aria-label={isLight ? "Qorong'u mavzuga o'tish" : "Yorug' mavzuga o'tish"}
            title={isLight ? "Qorong'u mavzu" : "Yorug' mavzu"}
          >
            {isLight ? <IoMoon size={20} /> : <IoSunny size={20} />}
          </button>

          <div className="header-user" title={user}>
            <span className="avatar" style={{ width: 34, height: 34 }}>
              {user.charAt(0).toUpperCase()}
            </span>
            <span className="header-user__name">{user}</span>
          </div>

          <NavLink
            to="/logout/"
            className="btn--icon"
            aria-label="Chiqish"
            title="Chiqish"
          >
            <IoLogOut size={20} />
          </NavLink>

          <button
            type="button"
            className="btn--icon menu-toggle"
            aria-label={menuOpen ? "Menyuni yopish" : "Menyuni ochish"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <IoClose size={22} /> : <IoMenu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
