"use client";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
      setLoading(false);
      return;
    }

    localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));

// If the user hasn't chosen a role yet,
// send them to the role selector.
// If they already have a role, send them directly.

if (!localStorage.getItem("selectedRole")) {
  router.push("/pages/select-role");
  return;
}

const role = localStorage.getItem("selectedRole");

if (role === "doctor") {
  router.push("/pages/doctor");
} else {
  router.push("/pages/dashboard");
}

  } catch (err) {
    setError("Server unavailable.");
  }

  setLoading(false);
};

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white/95 p-10 shadow-2xl backdrop-blur-sm transition-all duration-300">

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Welcome Back
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Sign in to continue to your <span className="font-semibold text-blue-600">MediNexa AI</span> workspace.
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-6"
        >

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="faith@example.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-green-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-100"
             />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Password
            </label>

            <div className="relative">
              <Lock
                size={20}
                className="absolute left-3 top-3.5 text-gray-400"
              />

              <input
                 type={showPassword ? "text" : "password"}
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 placeholder="Password123"
                 className="w-full rounded-xl border pl-10 pr-12 py-3 outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors duration-200 hover:text-blue-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-3 text-slate-600">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              Remember me
            </label>

            <a
              href="/pages/forgot-password"
              className="font-semibold text-blue-600 transition hover:text-blue-700"
            >
              Forgot Password?
            </a>
          </div>

          {error && (
  <div className="rounded-xl bg-red-100 border border-red-300 p-3 text-sm text-red-700">
    {error}
  </div>
)}

<button
  type="submit"
  disabled={loading}
  className="w-full rounded-xl bg-gradient-to-r from-green-600 to-green-700 py-3.5 text-base font-semibold text-white shadow-lg shadow-green-200 transition-all duration-300 hover:-translate-y-0.5 hover:from-green-700 hover:to-green-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
>
  {loading ? "Signing In..." : "Sign In"}
</button>

        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Don't have an account?

          <a
            href="/pages/register"
            className="ml-1 font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Create one
          </a>
        </p>
      </div>
    </main>
  );
}