import { noticeStore } from '../stores/NoticeStore';
import useStore from './useStore';

export default function useNoticeStore() {
  return useStore(noticeStore);
}
