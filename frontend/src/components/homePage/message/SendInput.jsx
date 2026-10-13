import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addMessage } from "../../../redux/userSlice";
import { API_URL } from "../../../utils/api.js";

export default function SendInput() {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    const messageText = message.trim();

    if (!messageText || !selectedUser?._id || isSending) {
      return;
    }

    setIsSending(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/message/send/${selectedUser._id}`,
        { message: messageText },
        { withCredentials: true }
      );
      dispatch(addMessage(response.data.data));
      setMessage("");
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form
      className="border-t border-white/10 bg-slate-950/25 p-4 sm:px-8 sm:py-5"
      onSubmit={handleSendMessage}
    >
      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/15 p-2 shadow-inner shadow-black/10 focus-within:border-teal-300/50">
        <button
          type="button"
          aria-label="Attach a file"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xl text-slate-400 transition hover:bg-white/10 hover:text-teal-200"
        >
          +
        </button>
        <input
          className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-slate-500"
          placeholder="Write a message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          disabled={!selectedUser?._id || isSending}
        />
        <button
          type="submit"
          aria-label="Send message"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal-300 text-lg font-bold text-slate-950 transition hover:bg-teal-200 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!selectedUser?._id || !message.trim() || isSending}
        >
          &rarr;
        </button>
      </div>
      <p className="mt-2 hidden text-center text-[10px] uppercase tracking-[0.16em] text-slate-600 sm:block">
        Messages are private and encrypted in transit
      </p>
    </form>
  );
}
