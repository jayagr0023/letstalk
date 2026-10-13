import {useGetRealTimeMessage} from "../../../hooks/useGetRealTimeMessage";
import Message from "./Message";
import { useSelector } from "react-redux";
import { useLayoutEffect, useRef } from "react";
import useGetMessage from "../../../hooks/useGetMessage";

export default function Messages() {
  useGetMessage();
  useGetRealTimeMessage();
  const { messages, selectedUser } = useSelector((store) => store.user);
  const messagesContainerRef = useRef(null);

  useLayoutEffect(() => {
    const container = messagesContainerRef.current;
    if (container && container.scrollHeight > container.clientHeight) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const selectedUserInitials = selectedUser?.profilePic;

  return (
    <div
      ref={messagesContainerRef}
      className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8"
    >
      <div className="flex min-h-full flex-col justify-end gap-5">
        <div className="mx-auto shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Today
        </div>
        {messages.map((message) => {
          const mine = message.senderId !== selectedUser?._id;
          const time = message.createdAt
            ? new Date(message.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "";

          return (
            <div className="shrink-0" key={message._id}>
              <Message
                mine={mine}
                avatar={mine ? undefined : selectedUserInitials}
                time={time}
              >
                {message.message}
              </Message>
            </div>
          );
        })}
      </div>
    </div>
  );
}