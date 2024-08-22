import { useState, useEffect } from 'react';
import axios from 'axios';
import base_url from '@/utils/base_url';

const useFetch = (endpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(base_url + endpoint,{headers:{"x-api-key":"[gJzLw!'^!KW3X8v.5c4WYvjPxVliea5"}});
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    return { data, loading, error };
};

export default useFetch;
