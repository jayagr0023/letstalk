import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/userSlice";

export default function useGetMessage() {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector((store) => store.user);
    const selectedUserId = selectedUser?._id;

    useEffect(() => {
        let isCurrentRequest = true;
        dispatch(setMessages([]));

        if (!selectedUserId) {
            return () => {
                isCurrentRequest = false;
            };
        }

        const fetchMessages = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/message/${selectedUserId}`,
                    { withCredentials: true }
                );
                if (isCurrentRequest) {
                    dispatch(setMessages(response.data));
                }
            } catch (error) {
                if (isCurrentRequest) {
                    console.error(
                        "Error fetching messages:",
                        error.response?.data || error.message
                    );
                }
            }
        };

        fetchMessages();

        return () => {
            isCurrentRequest = false;
        };
    }, [dispatch, selectedUserId]);
}
