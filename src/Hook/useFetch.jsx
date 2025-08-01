import { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";

// Axios instance dengan interceptor untuk JWT
const createApiInstance = (
  baseURL =  import.meta.env.REACT_APP_BACKEND_API || "http://localhost:3001/api"
) => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor - menambahkan JWT token
  instance.interceptors.request.use(
    (config) => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (token) {
        // OPSI 1: Menggunakan format JWT standar (tanpa Bearer)
        config.headers.Authorization = token;
        
        // OPSI 2: Menggunakan custom header
        // config.headers['X-Auth-Token'] = token;
        
        // OPSI 3: Menggunakan format JWT custom
        // config.headers.Authorization = `JWT ${token}`;
        
        // OPSI 4: Bearer format (standar yang benar untuk JWT)
        // config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor - handle token expired
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Token expired atau invalid
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");

        // Dispatch custom event untuk logout di seluruh aplikasi
        window.dispatchEvent(new CustomEvent("auth:logout"));

        // Hanya redirect jika bukan dari checkAuth
        if (!error.config?.skipAuthRedirect) {
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Custom hook untuk API operations
export const useApi = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelTokenRef = useRef();

  const api = createApiInstance(options.baseURL);

  // Cleanup function untuk cancel request
  useEffect(() => {
    return () => {
      if (cancelTokenRef.current) {
        cancelTokenRef.current.cancel("Component unmounted");
      }
    };
  }, []);

  // Generic request handler
  const makeRequest = useCallback(
    async (config) => {
      try {
        setLoading(true);
        setError(null);

        // Create cancel token
        cancelTokenRef.current = axios.CancelToken.source();
        config.cancelToken = cancelTokenRef.current.token;

        const response = await api(config);
        return response.data;
      } catch (err) {
        // Ignore cancelled requests
        if (axios.isCancel(err)) {
          return null;
        }

        const errorMessage =
          err.response?.data?.message || err.message || "Something went wrong";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [api]
  );

  // GET - Fetch data
  const get = useCallback(
    async (id = "", params = {}) => {
      const url = id ? `${endpoint}/${id}` : endpoint;
      const result = await makeRequest({
        method: "GET",
        url,
        params,
      });
      if (result) setData(result);
      return result;
    },
    [endpoint, makeRequest]
  );

  // POST - Create new data
  const post = useCallback(
    async (payload, customEndpoint = "") => {
      const url = customEndpoint || endpoint;
      const result = await makeRequest({
        method: "POST",
        url,
        data: payload,
      });
      return result;
    },
    [endpoint, makeRequest]
  );

  // PUT - Update data
  const put = useCallback(
    async (id, payload) => {
      const result = await makeRequest({
        method: "PUT",
        url: `${endpoint}/${id}`,
        data: payload,
      });
      return result;
    },
    [endpoint, makeRequest]
  );

  // PATCH - Partial update
  const patch = useCallback(
    async (id, payload) => {
      const result = await makeRequest({
        method: "PATCH",
        url: `${endpoint}/${id}`,
        data: payload,
      });
      return result;
    },
    [endpoint, makeRequest]
  );

  // DELETE - Remove data
  const remove = useCallback(
    async (id) => {
      const result = await makeRequest({
        method: "DELETE",
        url: `${endpoint}/${id}`,
      });
      return result;
    },
    [endpoint, makeRequest]
  );

  // Custom request - untuk endpoint khusus
  const customRequest = useCallback(
    async (config) => {
      return await makeRequest(config);
    },
    [makeRequest]
  );

  return {
    data,
    loading,
    error,
    get,
    post,
    put,
    patch,
    remove,
    customRequest,
    setData,
    setError,
  };
};

// Hook khusus untuk authentication
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const checkingAuthRef = useRef(false);

  const api = createApiInstance();

  // Login
  const login = useCallback(
    async (credentials) => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.post("/auth/login", credentials);
        const { token, user: userData } = response.data;

        // Simpan token (pastikan menyimpan JWT token murni tanpa prefix)
        localStorage.setItem("token", token);
        setUser(userData);
        setIsAuthenticated(true);

        return response.data;
      } catch (err) {
        const errorMessage = err.response?.data?.message || "Login failed";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [api]
  );

  // Register
  const register = useCallback(
    async (userData) => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.post("/auth/register", userData);
        return response.data;
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || "Registration failed";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [api]
  );

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  // Check if user is authenticated
  const checkAuth = useCallback(async () => {
    // Prevent multiple simultaneous auth checks
    if (checkingAuthRef.current) {
      return isAuthenticated;
    }

    try {
      checkingAuthRef.current = true;
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setIsInitialized(true);
        return false;
      }

      // Add special flag to skip redirect on 401
      const response = await api.get("/auth/me", {
        skipAuthRedirect: true,
      });

      setUser(response.data);
      setIsAuthenticated(true);
      setError(null);
      setIsInitialized(true);
      return true;
    } catch (err) {
      // Handle different error scenarios
      if (err.response?.status === 401) {
        console.log("Token expired or invalid, logging out...");
      } else if (err.code === "ECONNABORTED") {
        console.log("Auth check timeout");
        setError("Network timeout during authentication check");
      } else if (!err.response) {
        console.log("Network error during auth check");
        setError("Network error during authentication check");
      } else {
        console.log("Server error during auth check:", err.response?.status);
        setError("Server error during authentication check");
      }

      logout();
      setIsInitialized(true);
      return false;
    } finally {
      checkingAuthRef.current = false;
    }
  }, [api, logout, isAuthenticated]);

  // Auto-check auth on mount
  useEffect(() => {
    if (!isInitialized) {
      checkAuth();
    }
  }, [checkAuth, isInitialized]);

  // Listen for logout events from other tabs/windows
  useEffect(() => {
    const handleAuthLogout = () => {
      logout();
    };

    window.addEventListener("auth:logout", handleAuthLogout);

    // Listen for storage changes (logout dari tab lain)
    const handleStorageChange = (e) => {
      if (e.key === "token" && !e.newValue && isAuthenticated) {
        logout();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("auth:logout", handleAuthLogout);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [logout, isAuthenticated]);

  // Refresh token function (optional)
  const refreshToken = useCallback(async () => {
    try {
      const response = await api.post("/auth/refresh");
      const { token } = response.data;
      localStorage.setItem("token", token);
      return true;
    } catch (err) {
      logout();
      return false;
    }
  }, [api, logout]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    isInitialized,
    login,
    register,
    logout,
    checkAuth,
    refreshToken,
  };
};