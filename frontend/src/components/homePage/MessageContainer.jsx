import Messages from "./message/Messages";
import SendInput from "./message/SendInput";
//display selected user messages and send input
import { useSelector } from "react-redux";
import { setSelectedUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function MessageContainer() {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers, authUser } = useSelector((store) => store.user);
  const isOnline = onlineUsers.some(id => String(id) === String(selectedUser?._id));

  useEffect(() => {
    // Clear selected user when component unmounts
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, [dispatch]);

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col justify-center bg-slate-950/35">
      {selectedUser?._id ?
        <> <header className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-5 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <img src={selectedUser?.profilePic} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-rose-300 font-bold text-slate-900"></img>
            <div className="min-w-0">
              <h2 className="truncate text-base font-bold text-white sm:text-lg">{selectedUser?.fullName}</h2>
              {isOnline && selectedUser?._id ? (
                <p className="mt-0.5 flex items-center gap-2 text-xs text-teal-200"><span className="h-2 w-2 rounded-full bg-green-500" />Online</p>
              ) : ""}
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <button aria-label="Open conversation details" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-lg transition hover:bg-white/10 hover:text-white">i</button>
          </div>

        </header><Messages />
          <div className="shrink-0">
            <SendInput />
          </div></> : <><header className="flex flex-col gap-2 items-center justify-center text-center "><div className="welcome text-4xl md:text-md">Welcome, <strong className="capitalize">{authUser?.fullName}</strong></div><div className="message">Say "Hi" to Someone</div></header></>}


    </section>
  );
}
