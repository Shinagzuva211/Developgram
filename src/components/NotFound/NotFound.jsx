import { IoArrowBack, IoCompass } from "react-icons/io5";
import { Link } from "react-router-dom";
import Header from "../../Header";

export default function NotFound() {
  return (
    <>
      <Header />

      <div className="page container">
        <div className="card center-card fade-in">
          <span className="center-card__icon">
            <IoCompass size={44} />
          </span>
          <p className="center-card__code">404</p>
          <h1>Sahifa topilmadi</h1>
          <p className="muted">
            Siz izlayotgan sahifa mavjud emas yoki ko'chirilgan bo'lishi mumkin.
          </p>
          <Link className="btn btn--primary" to="/index/">
            <IoArrowBack size={18} /> Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    </>
  );
}
