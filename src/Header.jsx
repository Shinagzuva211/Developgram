import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "./Context";
import "./index.css"
export default function Header() {
  const { isDark , toggleTheme } = useContext(ThemeContext);

  return (
    <header className={`header ${isDark ? "light-head" : "dark-head"}`}>
      <div className="container header-content">
        
        <NavLink className="logo2" to="/index/">
          <img src="/logo.png" alt="logo" />
          <h2>Developgram</h2>
        </NavLink>

        <ul>
          <li><NavLink to="/index/">Bosh sahifa</NavLink></li>
          <li><a href="#">Biz haqimizda</a></li>
          <li><NavLink to="/contact/">Kontakt</NavLink></li>
          <li><NavLink to="/profile/">Profil</NavLink></li>
        </ul>

        <button
          className={`mode-btn ${isDark ? "light-btn" : "dark-btn"}`}
          onClick={toggleTheme}
        >
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>

      </div>
    </header>
  );
}
