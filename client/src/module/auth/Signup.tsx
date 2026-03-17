import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { signup } from "../api/authApi";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

type Role = "student" | "teacher";

export const Signup: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const { token, user } = await signup({ name, email, password, role });
      auth.setAuth(token, user);
      navigate("/app");
    } catch (e: any) {
      setError(e?.message ?? "Signup failed");
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
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-[var(--text-primary)]">Create an account</h1>
          <p className="text-sm text-[var(--text-secondary)]">Start your learning journey today</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <Input
            label="Full name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            autoComplete="name"
          />

          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <Input
            label="Password"
            type="password"
            placeholder="Min. 8 characters"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[var(--text-secondary)]">I am a…</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className={`rounded-md border py-2 text-sm font-medium transition-colors ${
                  role === "student"
                    ? "border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]"
                    : "border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
                onClick={() => setRole("student")}
              >
                Student
              </button>
              <button
                type="button"
                className={`rounded-md border py-2 text-sm font-medium transition-colors ${
                  role === "teacher"
                    ? "border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]"
                    : "border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
                onClick={() => setRole("teacher")}
              >
                Teacher
              </button>
            </div>
          </div>

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
            ) : "Create account"}
          </Button>
        </form>

        {error && (
          <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        <p className="mt-8 text-center text-sm text-[var(--text-secondary)]">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors">Sign in</Link>
        </p>
      </Card>
    </div>
  );
};
