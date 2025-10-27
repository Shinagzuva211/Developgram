import { VscGear, VscSave } from 'react-icons/vsc'
import "./Setting.css"
import Header from '../../Header'
import { BiBell, BiHistory, BiStar } from 'react-icons/bi'
import { useContext } from 'react'
import { ThemeContext } from '../../Context'
import {  BsEyeSlash, } from 'react-icons/bs'
import { ImBlocked } from 'react-icons/im'
import { CiSaveDown2 } from 'react-icons/ci'

export default function Setting() {
  const {isDark} = useContext(ThemeContext)
  return (
    <div>

      <Header/>

      <div className="setting-parent">
        <div className={`fixed ${isDark ? "light-box3" : "dark-box"}`}>
        <div className={`setting ${isDark ? "light-setting" : "dark-setting"}`}>Settings <VscGear className='set-icon' /></div>

        <div style={{paddingLeft: '20px'}} className="setting-box">

          <div style={{display: 'flex', alignItems: 'center', gap: '20px', fontSize:'20px'}} className={`setting-btn ${isDark ? "light-btn2" : "dark-btn2"}`}>
          <VscGear/> Account 
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: '20px', fontSize:'20px'}} className={`setting-btn ${isDark ? "light-btn2" : "dark-btn2"}`}>
          <BiHistory/> Arxivlar 
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: '20px', fontSize:'20px'}} className={`setting-btn ${isDark ? "light-btn2" : "dark-btn2"}`}>
          < CiSaveDown2 /> Saqlangan 
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: '20px', fontSize:'20px'}} className={`setting-btn ${isDark ? "light-btn2" : "dark-btn2"}`}>
          <BiBell/>  Bildirishnoma
          </div>

          <hr style={{width:'94%', opacity: '.7', marginTop:'20px'}} />

          <div style={{display: 'flex', alignItems: 'center', gap: '20px', fontSize:'20px'}} className={`setting-btn ${isDark ? "light-btn2" : "dark-btn2"}`}>
          <BiStar/>  Yaqin Do'stlar
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: '20px', fontSize:'20px'}} className={`setting-btn ${isDark ? "light-btn2" : "dark-btn2"}`}>
          <ImBlocked/> Bloklangan
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: '20px', fontSize:'20px'}} className={`setting-btn ${isDark ? "light-btn2" : "dark-btn2"}`}>
          <BsEyeSlash/>  Hikoyani Berkitish
          </div>

        </div>

      </div>

      <div className="right">
      </div>
      </div>

    </div>
  )
}
