import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const api = axios.create({
  baseURL: API_BASE,
});

// Inject Authorization token from localStorage on every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("araniko_admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Redirect to login if token expires (401 unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("araniko_admin_token");
      localStorage.removeItem("araniko_admin_user");
      // Check if we are already on login page to prevent infinite redirects
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    if (response.data.token) {
      localStorage.setItem("araniko_admin_token", response.data.token);
      localStorage.setItem("araniko_admin_user", JSON.stringify(response.data.admin));
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem("araniko_admin_token");
    localStorage.removeItem("araniko_admin_user");
  },
  getMe: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
  isAuthenticated: () => {
    return !!localStorage.getItem("araniko_admin_token");
  },
  getCurrentUser: () => {
    const user = localStorage.getItem("araniko_admin_user");
    return user ? JSON.parse(user) : null;
  },
};

export const doctorService = {
  getAll: async () => {
    const response = await api.get("/doctors");
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/doctors/${id}`);
    return response.data;
  },
  create: async (formData) => {
    // formData handles both fields and image file
    const response = await api.post("/doctors", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  update: async (id, formData) => {
    const response = await api.put(`/doctors/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/doctors/${id}`);
    return response.data;
  },
};

export const departmentService = {
  getAll: async () => {
    const response = await api.get("/departments");
    return response.data;
  },
};

export const newsService = {
  getAllPublic: async () => {
    const response = await api.get("/news");
    return response.data;
  },
  getAllAdmin: async () => {
    const response = await api.get("/news/admin");
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/news/${id}`);
    return response.data;
  },
  create: async (formData) => {
    const response = await api.post("/news", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  update: async (id, formData) => {
    const response = await api.put(`/news/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/news/${id}`);
    return response.data;
  },
};

export const profileService = {
  get: async () => {
    const response = await api.get("/profile");
    return response.data;
  },
  update: async (formData) => {
    const response = await api.put("/profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};

export const dashboardService = {
  getStats: async () => {
    const response = await api.get("/dashboard/stats");
    return response.data;
  },
};

export default api;
