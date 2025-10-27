import React, { useContext, useState } from "react";
import { RiUserSearchFill } from "react-icons/ri"; 
import './Contact.css'
import Header from "../../Header";
import { NavLink, Outlet } from "react-router-dom";
import { ThemeContext } from "../../Context";

export default function Contacts() {
    const {isDark} = useContext(ThemeContext)
    const [loading, setLoading] = useState(false);
    const contacts = ["Sardor", "Jasur", "Ali"];
    const handleSearch = () => {
    setLoading(true);
  };
  return (
    <div>

      <Header/>
      
     <div className="container">

       <div className={`users-npt ${isDark ? "light-npt" : "dark-npt"}`}>
        <input type="text" placeholder="Foydalanuvchi Kiriting.."/> 
        <RiUserSearchFill onClick={handleSearch} className="search-btn"/>
      </div>

      {loading && <p className={`loading ${isDark ? "light-text" : "dark-text"}`}>Fetching users...</p>}

      <div style={{fontSize: '30px', padding: '30px 0 20px',}} className={`${isDark ? "light-text2" : "dark-text2"}`}>
        Kontaktlaringiz
      </div>

        <div className="chat-content">
          <div className={`your-contacts ${isDark ? "light-box" : "dark-box"}`}>

          {contacts.map((name) => (
            <NavLink
          key={name}
          to={`/contact/${name}`}
          style={{ textDecoration: "none" }}
        >
          <div className={`chat-box ${isDark ? "light-hover" : "dark-hover"}`}>
  
            <img className="chat-img" src="/user.png" alt="" />

          {name}  
          </div>
        </NavLink>

      ))}
          
      </div>

       <div style={{flex: '1'}}>
        <Outlet/>
       </div>
        </div>

     </div>

    </div>
  );
}
