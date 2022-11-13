import { memberStore } from '../stores/MemberStore';
import useStore from './useStore';

export default function useMemberStore() {
  return useStore(memberStore);
}
