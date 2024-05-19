import React, { useEffect, FC } from 'react';
import { useRouter } from 'next/navigation'; // Updated import path
import { loadCredentials } from '@/app/services/apiService'; // Adjust the import path as needed

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
  const ComponentWithAuth: React.FC<P> = (props) => {
    const router = useRouter();

    useEffect(() => {
      if (typeof window !== 'undefined') { // Ensure this runs only on the client side
        const auth = sessionStorage.getItem('auth');
        if (!auth) {
          router.push('/login');
        } else {
          loadCredentials();
        }
      }
    }, [router]);

    if (typeof window !== 'undefined') {
      const auth = sessionStorage.getItem('auth');
      if (!auth) {
        return null; // Or a loading spinner
      }
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;