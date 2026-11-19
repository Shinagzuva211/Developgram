import {
  IoArrowForward,
  IoChatbubbles,
  IoCloudUpload,
  IoFilm,
  IoPeople,
  IoShieldCheckmark,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import Header from "../../Header";

const features = [
  {
    icon: IoFilm,
    title: "Qisqa videolar",
    text: "Ilhomlantiruvchi va qiziqarli qisqa videolarni kashf eting.",
  },
  {
    icon: IoChatbubbles,
    title: "Oson muloqot",
    text: "Do'stlaringiz bilan tez va qulay tarzda suhbat quring.",
  },
  {
    icon: IoPeople,
    title: "Hamjamiyat",
    text: "O'xshash qiziqishlarga ega dasturchilar bilan tanishing.",
  },
  {
    icon: IoShieldCheckmark,
    title: "Shaxsiy makon",
    text: "Profilingiz va ma'lumotlaringiz sizning nazoratingizda.",
  },
  {
    icon: IoCloudUpload,
    title: "Loyiha joylash",
    text: "O'z loyihalaringizni yuklang va hamjamiyat bilan ulashing.",
  },
];

export default function About() {
  return (
    <>
      <Header />

      <div className="page container">
        <section className="about-hero card fade-in">
          <span className="badge">Biz haqimizda</span>
          <h1>Developgram — dasturchilar uchun ijtimoiy makon</h1>
          <p className="muted">
            Biz g'oyalar almashish, yangi bilimlar olish va hamfikrlar bilan
            tanishish uchun qulay platforma yaratishni maqsad qilganmiz.
          </p>
        </section>

        <div className="about-grid">
          {features.map(({ icon: Icon, title, text }) => (
            <article key={title} className="card about-card">
              <span className="about-card__icon">
                <Icon size={24} />
              </span>
              <h3>{title}</h3>
              <p className="muted">{text}</p>
            </article>
          ))}
        </div>

        <section className="card about-cta fade-in">
          <span className="about-cta__icon">
            <IoCloudUpload size={30} />
          </span>
          <div className="about-cta__text">
            <h2>Loyihangizni joylang</h2>
            <p className="muted">
              Fayllaringizni yuklang, loyihangizni saqlang va boshqalar bilan
              ulashishga tayyor bo'ling.
            </p>
          </div>
          <Link className="btn btn--primary" to="/project-upload/">
            Loyiha joylash <IoArrowForward size={18} />
          </Link>
        </section>
      </div>
    </>
  );
}
