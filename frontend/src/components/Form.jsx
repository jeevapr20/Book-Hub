import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    setError("");
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/home");
      } else {
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid username or password. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div>
        <img src="bg2.png"></img>
      </div>
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "black",
          borderRadius: "10px",
        }}
      >
        <h1 className="text-center mb-4" style={{ color: "aqua" }}>
          {name}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>

          {loading && (
            <div className="text-center">
              <LoadingIndicator />
            </div>
          )}

          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}

          <div className="button-container mt-3">
            <button
              className="form-button btn btn-outline-primary w-100"
              type="submit"
            >
              {name}
            </button>
          </div>
        </form>

        {method === "login" && error && (
          <div className="mt-3 text-center d-flex flex-column justify-content-center align-items-center">
            <p style={{ color: "white" }}>Don't have an account?</p>
            <button
              className="form-button btn btn-outline-secondary"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;
