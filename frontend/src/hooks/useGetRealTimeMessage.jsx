import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../redux/userSlice";

export const useGetRealTimeMessage = () => {
    const { socket } = useSelector((store) => store.socket);
    const { authUser, selectedUser } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const currentUserId = authUser?._id;
        const selectedUserId = selectedUser?._id;

        if (!socket || !currentUserId || !selectedUserId) {
            return;
        }

        const handleNewMessage = (message) => {
            const isCurrentConversation =
                String(message.senderId) === String(selectedUserId) &&
                String(message.recieverId) === String(currentUserId);

            if (isCurrentConversation) {
                dispatch(addMessage(message));
            }
        };

        socket.on("newMessage", handleNewMessage);
        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, authUser?._id, selectedUser?._id, dispatch]);
}