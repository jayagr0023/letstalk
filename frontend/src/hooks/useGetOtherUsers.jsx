import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';
import { API_URL } from "../utils/api.js";

export default function useGetOtherUsers() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/user`, {
                    withCredentials: true,
                });
                // console.log('Other users from database:', res.data.otherUsers);
                dispatch(setOtherUsers(res.data.otherUsers));
            } catch (error) {
                console.error('Error fetching other users:', error);
            }
        };

        fetchOtherUsers();
    }, [dispatch]);

}
