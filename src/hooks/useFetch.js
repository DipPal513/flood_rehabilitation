import { useState, useEffect } from 'react';
import axios from 'axios';
import base_url from '@/utils/base_url';
import apiKey from '@/utils/api_key';
import Cookies from 'js-cookie';

const useFetch = (endpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = Cookies.get("accessToken");

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(base_url + endpoint, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    "Authorization": `Bearer ${token}`
                },
            });
            setData(response.data.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [endpoint]);

    return { data, loading, error, fetchData };
};

export default useFetch;
