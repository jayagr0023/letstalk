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
                axios.defaults.withCredentials = true;
                const res = await axios.get('http://localhost:8080/api/user');
                // console.log('Other users from database:', res.data.otherUsers);
                dispatch(setOtherUsers(res.data.otherUsers));
            } catch (error) {
                console.error('Error fetching other users:', error);
            }
        };

        fetchOtherUsers();
    }, []);

}
