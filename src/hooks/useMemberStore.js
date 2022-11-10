import { useEffect } from 'react';
import { memberStore } from '../stores/MemberStore';
import useForceUpdate from './useForceUpdate';

export default function useMemberStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    memberStore.subscribe(forceUpdate);

    return () => memberStore.unsubscribe(forceUpdate);
  }, [forceUpdate]);

  return memberStore;
}
