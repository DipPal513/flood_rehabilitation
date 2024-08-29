"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

      if (!user || user.role !== 'admin') {
        router.replace('/login'); // Redirect to login if not authenticated
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
