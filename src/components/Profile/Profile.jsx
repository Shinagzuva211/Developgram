import { NavLink } from "react-router-dom";
import Header from "../../Header";
import "./Profile.css"
import { useContext} from "react";
import { ThemeContext } from "../../Context";
export default function Profile() {
    const {isDark , toggleTheme } = useContext(ThemeContext)
    const user = localStorage.getItem( 'userName' )
  return (
    <div>

      <Header toggleTheme2={toggleTheme}/>

      <div className="profile-img">

        <div>
          <div className="add-img">
          <img src="/public/plus.png" alt="" />
        </div>

        <h2 className={`user-name ${isDark ? "light-text" : "dark-text"}`}>{user}</h2>
        </div>

        <div className="follow-content">

          <div className="following">
            Following <br />{ /* {following} */}
          </div>

          <div className="following">
            Followers <br />{ /* {followers} */}
          </div>

        </div>
      </div>

      <div className={`info ${isDark ? "light-box" : "dark-box" }`}>

      <NavLink className={'link2'} to={'/contact/'}>
      <div className="info-box">
          <h2> Kontakts </h2>
      </div>
      </NavLink>


      <NavLink className={'link2'} to={'/settings/'}>
        <div className="info-box">
        <h2> Account sozlamalari </h2>
      </div>
      </NavLink>

      <NavLink className={'link2'} to={'/project-upload'}>
        <div className="info-box">
        <h2> Proekt yuklash </h2>
      </div>
      </NavLink>

      <div className="info-box">
        <NavLink className={'link2'} to={'/'}>
          <h2> Chiqish  </h2>
        </NavLink>
      </div>

      </div>

    </div>
  );
}
