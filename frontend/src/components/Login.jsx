import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice.js';
import { API_URL } from "../utils/api.js";

export default function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await axios.post(`${API_URL}/api/user/login`, user, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (response.status === 200) {
                toast.success(response.data.message || "Logged in successfully");
                Navigate("/home");
            }
            dispatch(setAuthUser(response.data.user));
        } catch (error) {
            toast.error(error.response?.data?.message || "Unable to log in");
        } finally {
            setIsSubmitting(false);
        }
        setUser({
            email: "",
            password: "",
        });
    }

    return (
        <main className="grid w-full max-w-6xl items-center gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
            <aside className="px-2 py-4 text-white sm:px-6 lg:px-4">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-300/25 bg-teal-300/10 text-2xl text-teal-200 shadow-lg shadow-teal-950/30" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
                        <path d="M4 5.75A2.75 2.75 0 0 1 6.75 3h10.5A2.75 2.75 0 0 1 20 5.75v7.5A2.75 2.75 0 0 1 17.25 16H11l-5.25 4v-4.1A2.75 2.75 0 0 1 4 13.25v-7.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                        <path d="M8 8h8M8 11.5h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    </svg>
                </div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-teal-300">
                    Your conversations, together
                </p>
                <h2 className="max-w-lg text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                    Good to see you <span className="text-teal-300">again.</span>
                </h2>
                <p className="mt-5 max-w-md text-base leading-7 text-slate-300">
                    Your people and conversations are right where you left them. Sign in and pick up where the good chats begin.
                </p>
                <div className="mt-8 flex items-center gap-3 text-sm text-slate-400">
                    <span className="flex -space-x-2" aria-hidden="true">
                        <span className="h-8 w-8 rounded-full border-2 border-slate-900 bg-teal-300/80" />
                        <span className="h-8 w-8 rounded-full border-2 border-slate-900 bg-sky-300/80" />
                        <span className="h-8 w-8 rounded-full border-2 border-slate-900 bg-violet-300/80" />
                    </span>
                    <span>Make room for a good conversation.</span>
                </div>
            </aside>

            <section className="w-full overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950/55 shadow-2xl shadow-black/30 backdrop-blur-2xl">
                <div className="border-b border-white/10 bg-slate-950/35 px-6 py-8 text-white sm:px-10">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-teal-300">
                        Let&apos;s Talk
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Welcome back</h1>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                        Sign in to pick up where your conversations left off.
                    </p>
                </div>

                <form className="space-y-5 px-6 py-7 sm:px-10 sm:py-8" onSubmit={handleSubmit}>
                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-slate-200">Email</span>
                        <input
                            autoComplete="email"
                            className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-teal-400 focus:bg-white/10 focus:ring-4 focus:ring-teal-400/15"
                            name="email"
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            value={user.email}
                            placeholder="you@example.com"
                            required
                            type="email"
                        />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-slate-200">Password</span>
                        <input
                            autoComplete="current-password"
                            className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-teal-400 focus:bg-white/10 focus:ring-4 focus:ring-teal-400/15"
                            minLength="8"
                            onChange={(event) => setUser({ ...user, password: event.target.value })}
                            value={user.password}
                            name="password"
                            placeholder="Enter your password"
                            required
                            type="password"
                        />
                    </label>

                    <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-400">
                        <input
                            className="h-4 w-4 rounded border-white/20 bg-white/5 accent-teal-400 focus:ring-4 focus:ring-teal-400/15"
                            name="remember"
                            type="checkbox"
                        />
                        <span>Keep me signed in</span>
                    </label>

                    <button
                        className="h-12 w-full rounded-xl bg-teal-500 text-sm font-bold text-slate-950 shadow-lg shadow-teal-500/20 transition hover:bg-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-300/25 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={isSubmitting}
                        type="submit"
                    >
                        {isSubmitting ? "Logging in..." : "Log in"}
                    </button>

                    <p className="text-center text-sm text-slate-400">
                        New to Let&apos;s Talk?{" "}
                        <Link className="font-bold text-teal-300 hover:text-teal-200" to="/signup">
                            Create an account
                        </Link>
                    </p>
                </form>
            </section>
        </main>
    );
}
