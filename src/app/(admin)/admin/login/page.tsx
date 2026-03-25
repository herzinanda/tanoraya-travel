"use client";

import { useActionState } from "react";
import { loginAction } from "../../_actions/auth";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-secondary font-sans">
      <div className="w-full max-w-md mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/img/logo/tanoraya-logo.svg"
            alt="Tanoraya Travel"
            className="h-12 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-text-primary">Admin Panel</h1>
          <p className="text-text-secondary mt-1">
            Sign in to manage your site
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-surface rounded-lg shadow-md p-8 border border-border">
          <form action={formAction} className="space-y-5">
            {state?.error && (
              <div className="bg-danger-light text-danger text-sm px-4 py-3 rounded-md border border-danger/20">
                {state.error}
              </div>
            )}

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-text-primary mb-1.5"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-surface text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-primary mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-surface text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-primary rounded-md hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
