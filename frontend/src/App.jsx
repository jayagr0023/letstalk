
import Home from "./components/homePage/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { setSocket } from "./redux/socketSlice.js";
import { setAuthUser, setOnlineUsers } from "./redux/userSlice.js";
import axios from "axios";

export default function App() {
  const { authUser } = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/user/me`, {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(setAuthUser(response.data.loggedInUser));
      })
      .catch((error) => {
        if (error.response?.status !== 401) {
          console.error(
            "Failed to restore the logged-in user:",
            error.response?.data || error.message
          );
        }
      });
  }, [dispatch]);

  useEffect(() => {
    if (authUser) {
      const newSocket = io(`${import.meta.env.VITE_BACKEND_URL}`, {
        query: { userId: authUser._id },
      });
      dispatch(setSocket(newSocket));
      newSocket.on("getOnlineUsers", (onlineUsers) => {
        console.log("Online users:", onlineUsers);
        dispatch(setOnlineUsers(onlineUsers));
      })  
      return () => {
        newSocket.disconnect();
      };
    }
  }, [authUser, dispatch]);
  return (
    <div className="app-shell min-h-screen w-full p-2">
      <div className="relative z-10 flex min-h-[calc(100vh-1rem)] w-full items-center justify-center">
        <BrowserRouter>
          <Routes>            
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#102a38",
            color: "#e7f1f4",
            border: "1px solid rgba(94, 234, 212, 0.25)",
          },
          success: { iconTheme: { primary: "#2dd4bf", secondary: "#102a38" } },
          error: { iconTheme: { primary: "#fb7185", secondary: "#102a38" } },
        }}
      />
    </div>
  );
}
