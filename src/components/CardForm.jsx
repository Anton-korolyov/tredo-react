import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import api from "../api/axios";
import "./CardForm.css";

export default function CardForm({ initialData = {}, onSave, onCancel }) {
  const { t } = useTranslation();
  const BACKEND_ORIGIN = import.meta.env.VITE_API_URL;

  const [title, setTitle] = useState(initialData.title || "");
  const [price, setPrice] = useState(initialData.price || "");
  const [phone, setPhone] = useState(initialData.phone || "");
  const [description, setDescription] = useState(initialData.description || "");

  // ✅ IDs
  const [categoryId, setCategoryId] = useState(initialData.categoryId || "");
  const [cityId, setCityId] = useState(initialData.cityId || "");

  // lists
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(
    initialData.image ? BACKEND_ORIGIN + initialData.image : null
  );

  // ===== LOAD CATEGORIES =====
  useEffect(() => {
    api.get("/api/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  // ===== LOAD CITIES =====
  useEffect(() => {
    api.get("/api/cities/search")
      .then(res => setCities(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryId) {
      alert(t("selectCategory"));
      return;
    }

    if (!cityId) {
      alert(t("selectCity"));
      return;
    }

    onSave({
      ...initialData,
      title,
      price: Number(price),
      phone,
      description,
      CategoryId: Number(categoryId),
      CityId: Number(cityId),
      image: imageFile
    });
  };

  return (
    <form className="card-form" onSubmit={handleSubmit}>
      <h2>
        {initialData.id ? t("editCard") : t("createCard")}
      </h2>

      <input
        placeholder={t("title")}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder={t("price")}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      {/* CATEGORY */}
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
      >
        <option value="">{t("selectCategory")}</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* CITY */}
      <select
        value={cityId}
        onChange={(e) => setCityId(e.target.value)}
        required
      >
        <option value="">{t("selectCity")}</option>
        {cities.map(c => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        placeholder={t("phone")}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      {/* FILE */}
      <div className="file-upload">
        <label className="file-btn">
          📷 {t("chooseImage")}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </label>

        {imageFile && (
          <span className="file-name">{imageFile.name}</span>
        )}
      </div>

      {preview && (
        <img
          src={preview}
          alt="preview"
          style={{
            width: "100%",
            maxHeight: 200,
            objectFit: "cover",
            borderRadius: 12,
            marginTop: 10
          }}
        />
      )}

      <textarea
        className="desc"
        placeholder={t("description")}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
      />

      <div className="form-actions">
        <button type="submit" className="ios-btn primary">
          {t("save")}
        </button>
        <button type="button" className="ios-btn secondary" onClick={onCancel}>
          {t("cancel")}
        </button>
      </div>
    </form>
  );
}
