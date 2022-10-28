import { useEffect } from 'react';
import { postStore } from '../stores/PostStore';
import useForceUpdate from './useForceUpdate';

export default function usePostStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    postStore.subscribe(forceUpdate);

    return () => postStore.unsubscribe(forceUpdate);
  }, [forceUpdate]);

  return postStore;
}
