import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";
import "../styles/Form.css";
export default function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post(route, {
        username,
        password,
      });

      if (method === "login") {
        // Save tokens in local storage
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

        // Navigate to home page
        navigate("/");
      } else {
        // If registering, redirect to login page
        navigate("/login");
      }
    } catch (error) {
      alert(error.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // dynamic title
  const title = method === "login" ? "Login" : "Register";
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-md bg-white"
    >
      <h1 className="text-2xl font-semibold text-center mb-6">{title}</h1>

      {/* Username Field */}
      <input
        className="w-full p-2 mb-4 border rounded"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />

      {/* Password Field */}
      <input
        className="w-full p-2 mb-4 border rounded"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {loading && <LoadingIndicator />}
      {/* Submit Button */}
      <button
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        type="submit"
        disabled={loading}
      >
        {loading ? "Loading..." : title}
      </button>
    </form>
  );
}
