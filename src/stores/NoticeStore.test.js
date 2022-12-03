import context from 'jest-plugin-context';
import NoticeStore from './NoticeStore';

import { noticeApiService } from '../services/NoticeApiService';

describe('NoticeStore', () => {
  const noticeStore = new NoticeStore();

  context('API 서버에 접속한 사용자의 알림 목록을 요청할 경우', () => {
    it('웹 서버에서 응답으로 전달된 알림 목록을 상태로 저장', async () => {
      noticeApiService.setAccessToken('userId 1');
      await noticeStore.fetchNotices();

      const {
        notices,
        serverError,
      } = noticeStore;

      expect(notices.length).toBe(2);
      expect(notices[0].createdAt).toBe('6시간 전');
      expect(notices[1].title).toContain('새로운 참가 신청이 있습니다');
      expect(serverError).toBeFalsy();
    });
  });
});
