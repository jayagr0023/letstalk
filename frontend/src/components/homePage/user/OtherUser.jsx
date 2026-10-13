import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../../redux/userSlice";

export default function OtherUser({ user }) {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector(store => store.user);
  const isOnline = onlineUsers.some(id => String(id) === String(user._id));
  const selectedUserHandler = (user) => {
    // console.log("Selected user:", user);
    dispatch(setSelectedUser(user));
  }

  return (
    <button onClick={() => selectedUserHandler(user)} className={`cursor-pointer flex min-w-[245px] flex-1 items-center gap-3 rounded-2xl border p-3 text-left transition lg:w-full ${user?._id === selectedUser?._id ? "border-teal-300/30 bg-teal-300/10" : "border-transparent hover:border-white/10 hover:bg-white/5"}`}>
      <div className="image flex relative ">
        <img src={user?.profilePic} className={`h-11 w-11 shrink-0 place-items-center rounded-full ${user.color} text-sm font-bold text-slate-900 `} />
        {isOnline ? (
          <span className="h-2 w-2 relative right-1 rounded-full bg-green-500" />
        ) : ""}
        </div>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <strong className="truncate text-sm text-slate-100">{user.name}</strong>
          </div>
          <small className="shrink-0 text-[10px] text-slate-500">{user.time}</small>
        </span>
      </span>
    </button>
  );
}