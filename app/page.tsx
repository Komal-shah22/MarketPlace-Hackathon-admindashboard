"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLoggedIn = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "komalfareed93@gmail.com" && password === "Shah") {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/admindashbord");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLoggedIn} className="bg-white shadow-lg p-6 rounded-lg w-96">
        <h2 className="text-4xl font-extrabold mb-4 text-center">Admin Login</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-md font-extrabold text-2xl hover:bg-gray-800 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}








