import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import NotFound from "./Pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

function Logout() {
  // Clear all stored tokens
  localStorage.clear();

  // Redirect user to login page
  return <Navigate to="/login" />;
}
function RegisterWrapper() {
  localStorage.clear();
  return <Register />;
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home route (Protected) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterWrapper />} />
        <Route path="/logout" element={<Logout />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
