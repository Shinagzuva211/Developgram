import React, { useState, useEffect, useRef, useContext } from "react";
import Header from "../../Header";
import "./Home.css";
import user from "/public/user.png";
import { fetchYouTubeShorts } from "../../api/youtube";
import storyVideo from "./story.mp4";
import { ThemeContext } from "../../Context";


export default function Home() {
  const [shorts, setShorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);
  const {isDark} = useContext(ThemeContext)
  const videoRef = useRef(null);
  
  const storys = [
  { id: 1, img: user, name: "Hikoyangiz", plusImg: "/public/plus.png" },
  { id: 2, img: user, name: "User Name",  story: storyVideo, },
  { id: 3, img: user, name: "User Name",  story: storyVideo, },
  { id: 4, img: user, name: "User Name",  story: storyVideo, },
  { id: 5, img: user, name: "User Name",  story: storyVideo, },
  { id: 6, img: user, name: "User Name",  story: storyVideo, },
];
  useEffect(() => {
    const loadShorts = async () => {
      try {
        const data = await fetchYouTubeShorts('Programmers'); 
        setShorts(data);
      } catch (err) {
        console.error("Error loading shorts:", err);
      } finally {
        setLoading(false);
      }
    };

    loadShorts();
  }, []);

    const openStory = (story) => {
    setCurrentStory(story);
    setIsStoryOpen(true);
  };

  const closeStory = () => {
    setIsStoryOpen(false);
    setCurrentStory(null);
  };

  
  const handleMouseDown = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleMouseUp = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div>
      <Header />
    
      <div className="container">

        <div className="storyes">
                <div className="storyes">
        {storys.map((user) => (
          <div
            key={user.id}
            className="story"
            onClick={() => openStory(user)}
            style={{ cursor: "pointer" }}
          >
            <img src={user.img} alt="" width="88px" />
            {user.plusImg && (
              <img
                className="story-plus"
                src={user.plusImg}
                alt=""
                width="30px"
              />
            )}
            <p className={`story-owner ${isDark ? "light-text" : "dark-text"}`}>{user.name}</p>
          </div>
        ))}
      </div>

      {isStoryOpen && currentStory && (
        <div className="modal-overlay" onClick={closeStory}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <video
              ref={videoRef}
              src={currentStory.story}
              autoPlay
              className="story-video"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            />
          </div>
        </div>
      )}
        </div>

        <center>
          <div className="shorts">
          {loading ? (
            <p>Loading...</p>
          ) : (
            shorts.map((s) => (
              <div key={s.id} className="short">
                <iframe
                  src={`https://www.youtube.com/embed/${s.id}`}
                  title={s.title}
                  allowFullScreen
                />
                <p className="descr">{s.title}</p>
                <p className="chanel">Channel: {s.channel}</p>
              </div>
            ))
          )}
        </div>
        </center>

      </div>
    </div>
  );
}

