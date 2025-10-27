import "./App.css";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import Sign from "./components/Sign/Sign";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProjectUpload from "./components/Upload/Upload";
import Profile from "./components/Profile/Profile";
import Logout from "./components/Logout/Logout";
import { useState, useEffect } from "react";
import Chat from "./components/Chat/Chat";
import ChatPage from "./components/ChatPage/ChatPage";
import Setting from "./components/AccSetting/Setting";
import { ThemeProvider } from "./Context";


function ProtectedRoute({ children, isAuthed }) {
  return isAuthed ? children : <Navigate to="/login/" replace />;
}

export default function App() {
  const [isAuthed, setIsAuthed] = useState(!!localStorage.getItem("userName"));


  useEffect(() => {
    const checkAuth = () => setIsAuthed(!!localStorage.getItem("userName"));
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <>
    <ThemeProvider>
        <Router>

      <Routes>
        <Route path="/" element={<Sign setIsAuthed={setIsAuthed} />} />
        <Route path="/login/" element={<Sign setIsAuthed={setIsAuthed} />} />
        <Route path="/register/" element={<Sign setIsAuthed={setIsAuthed} />} />
        <Route path="/logout/" element={<Logout setIsAuthed={setIsAuthed} />} />

        <Route
          path="/profile/"
          element={
            <ProtectedRoute isAuthed={isAuthed}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project-upload/"
          element={
            <ProtectedRoute isAuthed={isAuthed}>
              <ProjectUpload />
            </ProtectedRoute>
          }
        />

        <Route path="/index/" element={<Home />} />
        <Route path="/about/" element={<About />} />
        <Route path="/chat/" element={<Chat />} />

        <Route path="/contact/" element={<Contact />}>
          <Route path=":username" element={<ChatPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/settings" element={<Setting />} />
      </Routes>
    </Router>
    </ThemeProvider>
      

    </>
  );
}
