"use client";

import { User, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            email,
            password,
            confirmPassword,
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

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      router.push("/pages/login");

    } catch (err) {
      setError("Unable to connect to the server.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-primary">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Join MediNexa AI
        </p>

        {error && (
          <div className="mb-5 rounded-xl bg-red-100 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >
                    <div>
            <label className="mb-2 block font-medium">
              Full Name
            </label>

            <div className="relative">
              <User
                size={20}
                className="absolute left-3 top-3.5 text-gray-400"
              />

              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Faith Kerubo"
                className="w-full rounded-xl border pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={20}
                className="absolute left-3 top-3.5 text-gray-400"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="faith@gmail.com"
                className="w-full rounded-xl border pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                placeholder="Enter Password"
                className="w-full rounded-xl border pl-10 pr-12 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                type="button"
                className="absolute right-4 top-3"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                👁️
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Confirm Password
            </label>

            <div className="relative">
              <Lock
                size={20}
                className="absolute left-3 top-3.5 text-gray-400"
              />

              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm Password"
                className="w-full rounded-xl border pl-10 pr-12 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                type="button"
                className="absolute right-4 top-3"
                onClick={() =>
                  setShowConfirm(!showConfirm)
                }
              >
                👁️
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary py-3 font-semibold text-white hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="mt-6 text-center text-gray-500">
          Already have an account?

          <a
            href="/pages/login"
            className="ml-2 text-primary font-semibold"
          >
            Login
          </a>
        </p>

      </div>
    </main>
  );
}