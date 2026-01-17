import { useState } from "react";
import "./CardForm.css";

export default function CardForm({ initialData = {}, onSave, onCancel }) {
  const BACKEND_URL = "https://tredo.co.il";
  const [title, setTitle] = useState(initialData.title || "");
  const [price, setPrice] = useState(initialData.price || "");
  const [city, setCity] = useState(initialData.city || "");
  const [phone, setPhone] = useState(initialData.phone || "");
  const [description, setDescription] = useState(initialData.description || "");

  // 🆕 FILE
  const [imageFile, setImageFile] = useState(null);
 const [preview, setPreview] = useState(
  initialData.image ? BACKEND_URL + initialData.image : null
);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...initialData,
      title,
      price: Number(price),
      city,
      phone,
      description,
      image: imageFile, // 👈 ВАЖНО: File, не string
    });
  };

  return (
    <form className="card-form" onSubmit={handleSubmit}>
      <h2>{initialData.id ? "Edit card" : "Add new card"}</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <input
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      {/* 📸 IMAGE UPLOAD */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

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
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
      />

      <div className="form-actions">
        <button type="submit" className="ios-btn primary">
          Save
        </button>
        <button type="button" className="ios-btn secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
