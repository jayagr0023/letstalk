import OtherUsers from "./user/OtherUsers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers } from "../../redux/userSlice";
import { useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  async function handleLogout() {
    try {
      await axios.get("http://localhost:8080/api/user/logout");
      dispatch(setAuthUser(null));
      dispatch(setOtherUsers(null));
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  }

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-white/10 bg-slate-950/45 lg:w-[350px] lg:border-b-0 lg:border-r">
      <div className="toolbar flex items-center justify-between ">
        <div className="flex items-center gap-3 px-5 pb-4 pt-6 sm:px-7">
          <img src="logo.png" className="h-12 w-12 rounded-full" />
          <span className="text-lg font-bold text-white">LetsTalk</span>
          {/* <button aria-label="Open settings" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-lg transition hover:bg-white/10 hover:text-white">⚙️</button> */}
        </div>

        <div className="px-5 sm:px-7">
          <label className="relative block">
            <input
              className="h-11 w-full rounded-xl border border-white/10 bg-black/15 px-4 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-teal-300/60 focus:ring-4 focus:ring-teal-300/10"
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search users"
              type="search"
              value={searchQuery}
            />
          </label>
        </div>

      </div>
      <OtherUsers searchQuery={searchQuery} />

      <div className="mt-auto border-t border-white/10 p-5 sm:p-7 lg:block">

        <button
          className="mt-3 h-10 w-full rounded-xl border border-rose-300/20 bg-rose-300/10 text-sm font-semibold text-rose-200 transition hover:border-rose-300/40 hover:bg-rose-300/20"
          onClick={handleLogout}
          type="button"
        >
          Log out
        </button>

      </div>
    </aside>
  );
}
