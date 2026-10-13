import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';

export default function useGetOtherUsers() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
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
