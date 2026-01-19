import { useEffect, useState, useRef } from "react";
import api from "../api/axios";
import { useTranslation } from "react-i18next";
import "./CitySelect.css";

export default function CitySelect({ value, onChange }) {
  const { i18n, t } = useTranslation();

  const [text, setText] = useState("");
  const [cities, setCities] = useState([]);
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  // 🔹 LOAD INITIAL LIST
  useEffect(() => {
    api.get("/api/cities/search", {
      params: { search: "", lang: i18n.language }
    }).then(res => setCities(res.data));
  }, [i18n.language]);

  // 🔍 FILTER
  useEffect(() => {
    const timeout = setTimeout(async () => {
      const res = await api.get("/api/cities/search", {
        params: {
          search: text,
          lang: i18n.language
        }
      });

      setCities(res.data);
    }, 200);

    return () => clearTimeout(timeout);
  }, [text, i18n.language]);

  // close outside
  useEffect(() => {
    const click = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", click);
    return () => document.removeEventListener("mousedown", click);
  }, []);

  return (
    <div className="city-select" ref={ref}>
      <input
        className="city-input"
        placeholder={t("allCities")}
        value={text}
        onFocus={() => setOpen(true)}
        onChange={(e) => setText(e.target.value)}
      />

      <span className="arrow">▾</span>

      {open && (
        <div className="city-dropdown">
          {cities.map(c => (
            <div
              key={c.id}
              className="city-option"
              onClick={() => {
                setText(c.name);
                setOpen(false);
                onChange(c.id);
              }}
            >
              {c.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

