import { NavLink } from "react-router-dom";
import {
  IoCloudUpload,
  IoChevronForward,
  IoLogOut,
  IoPeople,
  IoSettings,
} from "react-icons/io5";
import Header from "../../Header";
import "./Profile.css";

const menu = [
  { to: "/contact/", label: "Kontaktlar", hint: "Davlatlar va suhbatlar", icon: IoPeople },
  { to: "/settings/", label: "Account sozlamalari", hint: "Maxfiylik va bildirishnomalar", icon: IoSettings },
  { to: "/project-upload/", label: "Proekt yuklash", hint: "Fayllaringizni yuklang", icon: IoCloudUpload },
];

export default function Profile() {
  const user = localStorage.getItem("userName") || "Foydalanuvchi";

  return (
    <>
      <Header />

      <div className="page container">
        <div className="page-narrow fade-in">
          <section className="card profile-hero">
            <div className="profile-avatar-wrap">
              <img className="profile-avatar" src="/user.png" alt="Profil rasmi" />
              <NavLink
                to="/settings/"
                className="profile-avatar__edit"
                aria-label="Profil sozlamalari"
              >
                <IoSettings size={16} />
              </NavLink>
            </div>

            <h1 className="profile-name">{user}</h1>
            <span className="badge">Developgram a'zosi</span>

            <div className="profile-stats">
              <div className="stat">
                <strong>0</strong>
                <span>Kuzatish</span>
              </div>
              <div className="stat">
                <strong>0</strong>
                <span>Kuzatuvchilar</span>
              </div>
              <div className="stat">
                <strong>0</strong>
                <span>Proektlar</span>
              </div>
            </div>
          </section>

          <nav className="profile-menu card" aria-label="Profil bo'limlari">
            {menu.map(({ to, label, hint, icon: Icon }) => (
              <NavLink key={to} to={to} className="menu-item">
                <span className="menu-item__icon">
                  <Icon size={21} />
                </span>
                <span className="menu-item__text">
                  <strong>{label}</strong>
                  <small>{hint}</small>
                </span>
                <IoChevronForward className="menu-item__arrow" size={19} />
              </NavLink>
            ))}

            <NavLink to="/logout/" className="menu-item menu-item--danger">
              <span className="menu-item__icon">
                <IoLogOut size={21} />
              </span>
              <span className="menu-item__text">
                <strong>Chiqish</strong>
                <small>Hisobdan chiqish</small>
              </span>
              <IoChevronForward className="menu-item__arrow" size={19} />
            </NavLink>
          </nav>
        </div>
      </div>
    </>
  );
}
