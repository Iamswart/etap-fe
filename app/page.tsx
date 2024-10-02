'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/Auth';  
import AppLoader from '@/components/ui/AppLoader';

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {  
      if (user) {
        router.push('/subjects'); 
      } else {
        router.push('/login');  
      }
    }
  }, [router, user, isLoading]);  

  return <AppLoader />;  
}
