import React from "react";
import { Outlet } from "react-router-dom";
import Contacts from "../Contact/Contact";

export default function ContactLayout() {
  return (
    <div >
      <div>
        <Contacts />
        
      </div>

      <div>
        <Outlet />
        
      </div>
    </div>
  );
}
