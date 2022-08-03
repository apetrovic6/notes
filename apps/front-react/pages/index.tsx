import styles from './index.module.css';
import { useMeQuery } from '@notes/apollo';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function Index() {
  const { data: userData } = useMeQuery();
  const { replace } = useRouter();

  useEffect(() => {
    if (userData) {
      replace('/dashboard');
    }
  }, [userData]);
  return <div></div>;
}

export default Index;
