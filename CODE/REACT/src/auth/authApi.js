// In development, Vite proxies /api → http://localhost:5000 (see vite.config.js).
// For production builds, set VITE_API_URL to the full backend URL.
const API_URL = import.meta.env.VITE_API_URL || "/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

/**
 * Builds an OAuth redirect URL and validates that API_URL is configured.
 * @param {string} provider - The OAuth provider path (e.g., "/auth/google")
 * @returns {string} The full OAuth URL
 */
function buildOAuthUrl(provider) {
  const url = `${API_URL}${provider}`;
  if (url.includes("undefined")) {
    throw new Error(
      `[authApi] OAuth URL contains "undefined": "${url}". ` +
      `Check that VITE_API_URL is set correctly in your .env file.`
    );
  }
  return url;
}

export const authApi = {
  register: (name, email, password) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    }),

  login: (email, password) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  getProfile: () => request("/auth/profile"),

  updateProfile: (updates) =>
    request("/auth/profile", {
      method: "PATCH",
      body: JSON.stringify(updates),
    }),

  forgotPassword: (email) =>
    request("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  resetPassword: (token, newPassword) =>
    request("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, newPassword }),
    }),

  googleLoginUrl: () => buildOAuthUrl("/auth/google"),
  githubLoginUrl: () => buildOAuthUrl("/auth/github"),
};