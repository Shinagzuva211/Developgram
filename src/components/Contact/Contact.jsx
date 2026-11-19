import { useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Header from "../../Header";
import "./Contact.css";

const contacts = ["Sardor", "Jasur", "Ali", "Dilshod", "Malika"];

export default function Contacts() {
  const [query, setQuery] = useState("");
  const { pathname } = useLocation();

  const filteredContacts = useMemo(
    () =>
      contacts.filter((name) =>
        name.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [query]
  );

  return (
    <>
      <Header />

      <div className="page container">
        <div className="page-heading">
          <div>
            <h2 className="section-title">Xabarlar</h2>
            <p>Do'stlaringiz bilan suhbat quring</p>
          </div>
          <span className="badge">{contacts.length} ta kontakt</span>
        </div>

        <div className="messages">
          <aside className="card contacts-panel">
            <div className="contacts-panel__search">
              <IoSearch size={19} />
              <input
                type="search"
                placeholder="Foydalanuvchi qidirish..."
                aria-label="Foydalanuvchi qidirish"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="contacts-panel__list">
              {filteredContacts.length === 0 ? (
                <p className="contacts-empty">Foydalanuvchi topilmadi.</p>
              ) : (
                filteredContacts.map((name) => (
                  <NavLink
                    key={name}
                    to={`/contact/${name}`}
                    className={({ isActive }) =>
                      `contact-item ${isActive ? "is-active" : ""}`
                    }
                  >
                    <span className="avatar contact-item__avatar">
                      {name.charAt(0)}
                    </span>
                    <span className="contact-item__info">
                      <strong>{name}</strong>
                      <small>Faol</small>
                    </span>
                    <span className="contact-item__dot" />
                  </NavLink>
                ))
              )}
            </div>
          </aside>

          <section className="chat-pane card">
            {pathname === "/contact/" ? (
              <div className="state-box chat-empty">
                <span className="avatar chat-empty__icon">
                  <IoSearch size={30} />
                </span>
                <h3>Suhbatni boshlang</h3>
                <p>Chap tomondan kontaktni tanlang yoki qidiruvdan foydalaning.</p>
              </div>
            ) : (
              <Outlet />
            )}
          </section>
        </div>
      </div>
    </>
  );
}
