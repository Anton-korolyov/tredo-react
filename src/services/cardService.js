import api from "../api/axios";

// ================= GET (FILTER + SEARCH + PAGINATION) =================
export const getCards = async ({
  page = 1,
  pageSize = 12,
  city = "",
  search = "",
} = {}) => {
  const params = {
    page,
    pageSize,
  };

  if (city) params.city = city;
  if (search) params.search = search;

  const res = await api.get("/api/cards", { params });

  // backend возвращает { total, page, pageSize, items }
  return res.data;
};

// ================= CREATE =================
export const createCard = async (data) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("price", data.price);
  formData.append("city", data.city);
  formData.append("phone", data.phone);
  formData.append("description", data.description);

  if (data.image) {
    formData.append("image", data.image);
  }

  const res = await api.post("/api/cards", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

// ================= UPDATE =================
export const updateCard = async (id, data) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("price", data.price);
  formData.append("city", data.city);
  formData.append("phone", data.phone);
  formData.append("description", data.description);

  if (data.image) {
    formData.append("image", data.image);
  }

  const res = await api.put(`/api/cards/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

// ================= DELETE =================
export const deleteCard = async (id) => {
  await api.delete(`/api/cards/${id}`);
};
