
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice.js';

export default function Signup() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const passwordsDoNotMatch = user.confirmPassword.length > 0 && user.password !== user.confirmPassword;

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${import.meta.env.BACKEND_URL}/api/user/signup`, user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.status === 201) {
        dispatch(setAuthUser(response.data.user));
        toast.success(response.data.message || "Account created successfully");
        Navigate("/home");
      }
      setUser({
        fullName: "",
        email: "",
        gender: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to create your account");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="w-full max-w-xl sm:px-6">
      <section className="overflow-hidden rounded-4xl border border-white/15 bg-slate-950/55 shadow-2xl shadow-black/30 backdrop-blur-2xl">
        <div className="border-b border-white/10 bg-slate-950/35 px-6 py-8 text-white sm:px-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-teal-300">
            Let&apos;s Talk
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Create your account</h1>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            Join the conversation and stay connected with the people who matter.
          </p>
        </div>

        <form className="space-y-5 px-6 py-7 sm:px-10 sm:py-8" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-slate-200">Full name</span>
              <input
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-teal-400 focus:bg-white/10 focus:ring-4 focus:ring-teal-400/15"
                name="fullName"
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                placeholder="Jordan Lee"
                value={user.fullName}
                required
                type="text"
              />
            </label>

            <label className="sm:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-slate-200">Email</span>
              <input
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-teal-400 focus:bg-white/10 focus:ring-4 focus:ring-teal-400/15"
                name="email"
                placeholder="you@example.com"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                value={user.email}
                required
                type="email"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-semibold text-slate-200">Password</span>
              <input
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-teal-400 focus:bg-white/10 focus:ring-4 focus:ring-teal-400/15"
                minLength="8"
                name="password"
                onChange={(event) => setUser({ ...user, password: event.target.value })}
                value={user.password}
                placeholder="8+ characters"
                required
                type="password"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-semibold text-slate-200">Confirm password</span>
              <input
                aria-invalid={passwordsDoNotMatch}
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-teal-400 focus:bg-white/10 focus:ring-4 focus:ring-teal-400/15 aria-invalid:border-rose-400"
                name="confirmPassword"
                onChange={(event) => setUser({ ...user, confirmPassword: event.target.value })}
                value={user.confirmPassword}
                placeholder="Repeat your password"
                required
                type="password"
              />
              {passwordsDoNotMatch && (
                <span className="mt-1 block text-xs text-rose-300">Passwords do not match.</span>
              )}
            </label>
          </div>

          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-slate-200">Gender</legend>
            <div className="grid grid-cols-2 gap-2">
              {[
                ["female", "Female"],
                ["male", "Male"],
              ].map(([value, label]) => (
                <label className="cursor-pointer" key={value}>
                  <input
                    checked={user.gender === value}
                    className="peer sr-only"
                    name="gender"
                    onChange={(e) => setUser({ ...user, gender: e.target.value })}
                    required
                    type="radio"
                    value={value}
                  />
                  <span className="flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-slate-400 transition peer-checked:border-teal-400 peer-checked:bg-teal-400/15 peer-checked:text-teal-200 peer-focus-visible:ring-4 peer-focus-visible:ring-teal-400/15">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <button
            className="h-12 w-full rounded-xl bg-teal-500 text-sm font-bold text-slate-950 shadow-lg shadow-teal-500/20 transition hover:bg-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-300/25 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={passwordsDoNotMatch || isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>

          <p className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link className="font-bold text-teal-300 hover:text-teal-200" to="/login">
              Login
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
