"use client";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white/95 p-10 shadow-2xl backdrop-blur-sm transition-all duration-300">

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Welcome Back
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Sign in to continue to your <span className="font-semibold text-blue-600">MediNexa AI</span> workspace.
        </p>

        <form className="mt-8 space-y-6">

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
                placeholder="johndoe@gmail.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
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
                placeholder="Enter Password"
                className="w-full rounded-xl border pl-10 pr-12 py-3 outline-none focus:ring-2 focus:ring-blue-500"
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

          <button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:shadow-blue-300 active:translate-y-0">
            Sign In
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