import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/Auth';
import AppLoader from '../ui/AppLoader';


export function withAuthLayout(WrappedComponent: React.ComponentType) {
    return function WithAuthLayout(props: any) {
      const { user, isLoading } = useAuth();
      const router = useRouter();
  
      useEffect(() => {
        if (!isLoading && !user) {
          router.push('/login');
        }
      }, [user, isLoading, router]);
  
      if (isLoading) {
        return <AppLoader />;
      }
  
      if (!user) {
        return null;
      }
  
      return (
        <Layout>
          <WrappedComponent {...props} />
        </Layout>
      );
    };
  }