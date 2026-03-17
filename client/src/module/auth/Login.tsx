import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { login } from "../api/authApi";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const { token, user } = await login({ email, password });
      auth.setAuth(token, user);
      navigate("/app");
    } catch (e: any) {
      setError(e?.message ?? "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[var(--bg-primary)] p-6 overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-[var(--accent-primary)]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] h-[400px] w-[400px] rounded-full bg-[var(--accent-secondary)]/5 blur-[120px] pointer-events-none" />

      <Card className="relative z-10 w-full max-w-[420px] p-8 sm:p-10 shadow-lg border-[var(--border-subtle)]">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--accent-primary)] text-white shadow-sm">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M15 10l5-5m0 0l-5-5m5 5H9a6 6 0 000 12h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">EduConnect</span>
        </div>

        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-[var(--text-primary)]">Welcome back</h1>
          <p className="text-sm text-[var(--text-secondary)]">Sign in to your account to continue</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-[var(--text-secondary)]">Password</label>
              <button type="button" className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors">
                Forgot password?
              </button>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-md bg-[var(--bg-secondary)] border border-transparent px-3.5 py-2.5 text-sm text-[var(--text-primary)] transition-colors focus:border-[var(--accent-primary)] focus:bg-white focus:outline-none placeholder:text-[var(--text-muted)]"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="mt-2 w-full !py-3 font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "Sign in"}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-[var(--text-secondary)]">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors">Create one</Link>
        </p>
      </Card>
    </div>
  );
};
