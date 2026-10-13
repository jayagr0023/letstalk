const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const API_URL = backendUrl?.replace(/\/+$/, "");
