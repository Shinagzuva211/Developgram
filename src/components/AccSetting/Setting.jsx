import { useContext, useEffect, useState } from "react";
import { BiBell, BiHistory, BiStar } from "react-icons/bi";
import { BsEyeSlash } from "react-icons/bs";
import { CiSaveDown2 } from "react-icons/ci";
import { ImBlocked } from "react-icons/im";
import { VscGear } from "react-icons/vsc";
import Header from "../../Header";
import { ThemeContext } from "../../ThemeContext";
import "./Setting.css";

const sections = [
  { id: "account", label: "Account", icon: VscGear, description: "Hisob ma'lumotlaringizni va ko'rinishingizni boshqaring." },
  { id: "archive", label: "Arxivlar", icon: BiHistory, description: "Arxivlangan kontentlaringizni ko'rib chiqing." },
  { id: "saved", label: "Saqlangan", icon: CiSaveDown2, description: "Keyinroq ko'rish uchun saqlagan narsalaringiz." },
  { id: "notifications", label: "Bildirishnoma", icon: BiBell, description: "Qanday bildirishnomalar olishingizni tanlang." },
  { id: "close-friends", label: "Yaqin do'stlar", icon: BiStar, description: "Eng yaqin do'stlaringizni boshqaring." },
  { id: "blocked", label: "Bloklangan", icon: ImBlocked, description: "Bloklagan foydalanuvchilarni ko'ring va boshqaring." },
  { id: "hide-story", label: "Hikoyani berkitish", icon: BsEyeSlash, description: "Hikoyalarning kimga ko'rinishini sozlang." },
];

function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`switch ${checked ? "is-on" : ""}`}
      onClick={onChange}
    >
      <span />
    </button>
  );
}

export default function Setting() {
  const { isLight, toggleTheme } = useContext(ThemeContext);
  const [active, setActive] = useState("account");
  const [notifications, setNotifications] = useState(true);
  const [showStories, setShowStories] = useState(
    () => localStorage.getItem("showStories") !== "false"
  );

  useEffect(() => {
    localStorage.setItem("showStories", String(showStories));
  }, [showStories]);

  const current = sections.find((section) => section.id === active) ?? sections[0];
  const CurrentIcon = current.icon;

  return (
    <>
      <Header />

      <div className="page container">
        <div className="page-heading">
          <div>
            <h2 className="section-title">Sozlamalar</h2>
            <p>Hisobingizni va ilova afzalliklarini sozlang</p>
          </div>
        </div>

        <div className="settings-layout">
          <nav className="card settings-nav" aria-label="Sozlamalar bo'limlari">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                type="button"
                key={id}
                className={`settings-nav__item ${active === id ? "is-active" : ""}`}
                onClick={() => setActive(id)}
                aria-current={active === id ? "true" : undefined}
              >
                <Icon size={20} />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <section className="card settings-content fade-in" key={active}>
            <header className="settings-content__header">
              <span className="settings-content__icon">
                <CurrentIcon size={26} />
              </span>
              <div>
                <h3>{current.label}</h3>
                <p className="muted">{current.description}</p>
              </div>
            </header>

            <hr className="divider" />

            <h4 className="settings-content__subtitle">Afzalliklar</h4>

            <div className="pref-row">
              <div>
                <strong>Qorong'u mavzu</strong>
                <p className="muted">Ilovani qorong'u ko'rinishda ishlatish</p>
              </div>
              <Switch
                checked={!isLight}
                onChange={toggleTheme}
                label="Qorong'u mavzu"
              />
            </div>

            <div className="pref-row">
              <div>
                <strong>Bildirishnomalar</strong>
                <p className="muted">Yangiliklar va xabarlar haqida xabardor bo'lish</p>
              </div>
              <Switch
                checked={notifications}
                onChange={() => setNotifications((v) => !v)}
                label="Bildirishnomalar"
              />
            </div>

            <div className="pref-row">
              <div>
                <strong>Hikoyalarni ko'rsatish</strong>
                <p className="muted">Bosh sahifada hikoyalar bo'limini ko'rsatish</p>
              </div>
              <Switch
                checked={showStories}
                onChange={() => setShowStories((v) => !v)}
                label="Hikoyalarni ko'rsatish"
              />
            </div>

            <p className="settings-content__note form-hint">
              O'zgarishlar avtomatik ravishda qo'llaniladi.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
