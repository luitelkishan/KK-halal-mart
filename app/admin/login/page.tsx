
"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Login system will be connected in the next step.");
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg"
      >
        <h1 className="text-2xl font-bold text-emerald-800 text-center">
          K&K Halal Mart
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-8">
          Admin Login
        </p>

        <label className="block text-sm font-semibold mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full border rounded-lg p-3 mb-5"
        />

        <label className="block text-sm font-semibold mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          className="w-full border rounded-lg p-3 mb-6"
        />

        <button
          type="submit"
          className="w-full bg-emerald-800 text-white p-3 rounded-lg font-bold hover:bg-emerald-700"
        >
          Login
        </button>

        <p className="text-xs text-gray-400 text-center mt-6">
          K&K Business Management System
        </p>
      </form>
    </main>
  );
}