import { useNavigate } from "react-router-dom"
import "./Sign.css"
import {  useState } from "react";


export default function Sign({setIsAuthed}) {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [parol, setParol] = useState('')
const handleSubmit = (e) => {
  e.preventDefault();

  localStorage.setItem("userName", name);

  setIsAuthed(true);
  navigate("/index/");
};

   return (
    <div>
      <div  className="container">
      <div  className="wrapper">
      
  <div className="logo" >
      <img  src="/logo.png" alt="" />
  </div>
      <form className="login-box" onSubmit={handleSubmit}>

      <h1 className="title"> <span>Developgram</span> ga kirish </h1>
        
        <div className="npt-content">

          <div className="name-npt">
            <input 
            value={name} 
            type="text" 
            onChange={(e) => setName(e.target.value)}
            placeholder="Ismingiz" 
            required/>
          </div>

          <div className="name-npt">
            <input 
            value={email} 
            type="email" 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email.." 
            required/>
          </div>

          <div className="name-npt">
            <input 
            value={parol} 
            type="password" 
            onChange={(e) => setParol(e.target.value)}
            placeholder="Parol.." 
            required/>
          </div>

          <div  className="sign-btn">
            <button type="submit">Kirish</button>
          </div>

        </div>

      </form>

      

    </div>  
    </div>
    </div>
    
  )
}

