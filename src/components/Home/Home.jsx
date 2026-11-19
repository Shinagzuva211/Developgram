import { useCallback, useEffect, useRef, useState } from "react";
import { IoClose, IoPlay, IoRefresh, IoWarning } from "react-icons/io5";
import Header from "../../Header";
import { fetchYouTubeShorts } from "../../api/youtube";
import storyVideo from "./story.mp4";
import "./Home.css";

const userImage = "/user.png";

const stories = [
  { id: 1, name: "Hikoyangiz", img: userImage, plus: true },
  { id: 2, name: "Sardor", img: userImage, story: storyVideo },
  { id: 3, name: "Jasur", img: userImage, story: storyVideo },
  { id: 4, name: "Ali", img: userImage, story: storyVideo },
  { id: 5, name: "Dilshod", img: userImage, story: storyVideo },
  { id: 6, name: "Malika", img: userImage, story: storyVideo },
];

function Modal({ onClose, label, children }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={label}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Yopish"
        >
          <IoClose size={22} />
        </button>
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  const [shorts, setShorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeStory, setActiveStory] = useState(null);
  const [activeShort, setActiveShort] = useState(null);
  const [showStories] = useState(
    () => localStorage.getItem("showStories") !== "false"
  );
  const isMounted = useRef(true);

  const loadShorts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchYouTubeShorts();
      if (isMounted.current) setShorts(data);
    } catch (err) {
      console.error("Error loading shorts:", err);
      if (isMounted.current) setError("Videolarni yuklashda xatolik yuz berdi.");
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    loadShorts();
    return () => {
      isMounted.current = false;
    };
  }, [loadShorts]);

  const closeModal = () => {
    setActiveStory(null);
    setActiveShort(null);
  };

  return (
    <>
      <Header />

      <div className="page container">
        {showStories && (
        <section className="stories" aria-label="Hikoyalar">
          <div className="stories__track">
            {stories.map((story) => (
              <button
                type="button"
                key={story.id}
                className="story"
                onClick={() => setActiveStory(story)}
              >
                <span className="story__ring">
                  <img className="story__avatar" src={story.img} alt="" />
                </span>
                {story.plus && (
                  <span className="story__plus" aria-hidden="true">
                    +
                  </span>
                )}
                <span className="story__name">{story.name}</span>
              </button>
            ))}
          </div>
        </section>
        )}

        <section className="feed" aria-label="Qisqa videolar">
          <div className="page-heading">
            <div>
              <h2 className="section-title">Siz uchun videolar</h2>
              <p>Dasturchilik olamidan eng qiziqarli lahzalar</p>
            </div>
            {!loading && !error && shorts.length > 0 && (
              <button className="btn btn--ghost" onClick={loadShorts}>
                <IoRefresh size={18} /> Yangilash
              </button>
            )}
          </div>

          {loading ? (
            <div className="shorts-grid" aria-busy="true" aria-label="Yuklanmoqda">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="short-card short-card--skeleton">
                  <div className="skeleton short-card__thumb-skeleton" />
                  <div className="skeleton" style={{ height: 16, width: "85%" }} />
                  <div className="skeleton" style={{ height: 12, width: "50%" }} />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="card state-box">
              <IoWarning size={40} />
              <h3>{error}</h3>
              <button className="btn btn--primary" onClick={loadShorts}>
                Qayta urinish
              </button>
            </div>
          ) : shorts.length === 0 ? (
            <div className="card state-box">
              <IoPlay size={40} />
              <h3>Hozircha videolar topilmadi</h3>
              <p>API kaliti sozlanganligini tekshiring yoki keyinroq qayting.</p>
            </div>
          ) : (
            <div className="shorts-grid">
              {shorts.map((short) => (
                <button
                  type="button"
                  key={short.id}
                  className="short-card"
                  onClick={() => setActiveShort(short)}
                  aria-label={`${short.title} videosini ko'rish`}
                >
                  <span className="short-card__thumb">
                    <img src={short.thumbnail} alt="" loading="lazy" />
                    <span className="short-card__play">
                      <IoPlay size={24} />
                    </span>
                  </span>
                  <span className="short-card__body">
                    <span className="short-card__title">{short.title}</span>
                    <span className="short-card__channel">{short.channel}</span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>

      {(activeStory || activeShort) && (
        <Modal
          onClose={closeModal}
          label={activeShort ? activeShort.title : `${activeStory?.name} hikoyasi`}
        >
          {activeShort ? (
            <div className="video-modal">
              <iframe
                src={`https://www.youtube.com/embed/${activeShort.id}?autoplay=1&rel=0`}
                title={activeShort.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              <div className="video-modal__info">
                <h3>{activeShort.title}</h3>
                <p className="muted">{activeShort.channel}</p>
              </div>
            </div>
          ) : activeStory?.story ? (
            <video
              className="story-player"
              src={activeStory.story}
              autoPlay
              playsInline
              controls
            />
          ) : (
            <div className="state-box" style={{ padding: "40px 30px" }}>
              <h3>Hikoya qo'shish</h3>
              <p>Hikoya yuklash funksiyasi tez orada ishga tushadi.</p>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
