import api from "../api/axios";

// ================= GET (FILTER + SEARCH + PAGINATION) =================
export const getCards = async ({
  page = 1,
  pageSize = 12,
  search = "",
  categoryId = "",
  cityId = "",
} = {}) => {
  const params = {
    page,
    pageSize,
  };

  if (search) params.search = search;
  if (categoryId) params.categoryId = categoryId;
  if (cityId) params.cityId = cityId;

  const res = await api.get("/api/cards", { params });

  return res.data;
};

// ================= CITY AUTOCOMPLETE =================
export const searchCities = async (search, lang = "en") => {
  const res = await api.get("/api/cities/search", {
    params: { search, lang },
  });

  return res.data;
};

// ================= CREATE =================
export const createCard = async (data) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("price", data.price);
  formData.append("phone", data.phone);
  formData.append("description", data.description);

  formData.append("categoryId", data.CategoryId);
  formData.append("cityId", data.CityId);

  if (data.image) {
    formData.append("image", data.image);
  }

  const res = await api.post("/api/cards", formData);
  return res.data;
};

// ================= UPDATE =================
export const updateCard = async (id, data) => {
  const formData = new FormData();

  formData.append("Title", data.title);
  formData.append("Price", data.price);
  formData.append("Phone", data.phone ?? "");
  formData.append("Description", data.description ?? "");

  formData.append("CategoryId", data.categoryId);
  formData.append("CityId", data.cityId);

  if (data.image) {
    formData.append("Image", data.image);
  }

  const res = await api.put(`/api/cards/${id}`, formData);
  return res.data;
};

// ================= DELETE =================
export const deleteCard = async (id) => {
  await api.delete(`/api/cards/${id}`);
};
