import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://localhost:5000/manora/auth/login", form);

            login(res.data.token, res.data.user);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="p-10 bg-white">
            <h1 className="text-2xl font-bold mb-4">Login</h1>

            <form onSubmit={handleLogin} className="flex flex-col gap-3 w-80">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border p-2"
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border p-2"
                    value={form.password}
                    onChange={handleChange}
                />

                <button className="bg-black text-white py-2 font-bold">Login</button>
                <button
                    type="button"
                    onClick={() => {
                        window.location.href =
                            "http://localhost:5000/manora/auth/google";
                    }}
                    className="border px-4 py-2 font-bold"
                >
                    Continue with Google
                </button>
                <button
                    type="button"
                    onClick={() => {
                        window.location.href =
                            "http://localhost:5000/manora/auth/github";
                    }}
                    className="border px-4 py-2 font-bold bg-gray-800 text-white"
                >
                    Continue with GitHub
                </button>


                {error && <p className="text-red-600">{error}</p>}
            </form>
        </div>
    );
}
