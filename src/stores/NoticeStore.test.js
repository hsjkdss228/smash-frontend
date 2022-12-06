import context from 'jest-plugin-context';
import NoticeStore from './NoticeStore';

import { noticeApiService } from '../services/NoticeApiService';

describe('NoticeStore', () => {
  let noticeStore;
  let spyReadNotice;

  beforeEach(() => {
    noticeStore = new NoticeStore();
    spyReadNotice = jest.spyOn(noticeApiService, 'readNotice');
    jest.clearAllMocks();
  });

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

  context('알림의 상태를 읽음 상태로 변경 요청이 들어오는 경우', () => {
    context('알림이 읽지 않음 상태였다면', () => {
      beforeEach(() => {
        noticeStore.notices = [
          {
            id: 1,
            status: 'unread',
            createdAt: '6시간 전',
            title: '내가 신청한 운동 모집 게시글의 작성자가 신청을 수락했습니다.',
            detail: '신청한 게임 시간',
          },
          {
            id: 2,
            status: 'read',
            createdAt: '12시간 전',
            title: '내가 작성한 운동 모집 게시글에 새로운 참가 신청이 있습니다.',
            detail: '등록한 신청자: 황인우',
          },
        ];
      });

      it('알림을 읽음 상태로 변경하는 API 요청 호출', async () => {
        const targetIndex = 0;
        await noticeStore.readNotice(targetIndex);
        const expectedNoticeId = 1;
        expect(spyReadNotice).toBeCalledWith(expectedNoticeId);
      });
    });

    context('알림이 읽음 상태였다면', () => {
      beforeEach(() => {
        noticeStore.notices = [
          {
            id: 1,
            status: 'unread',
            createdAt: '6시간 전',
            title: '내가 신청한 운동 모집 게시글의 작성자가 신청을 수락했습니다.',
            detail: '신청한 게임 시간',
          },
          {
            id: 2,
            status: 'read',
            createdAt: '12시간 전',
            title: '내가 작성한 운동 모집 게시글에 새로운 참가 신청이 있습니다.',
            detail: '등록한 신청자: 황인우',
          },
        ];
      });

      it('알림을 읽음 상태로 변경하는 API 요청을 호출하지 않음', async () => {
        const targetIndex = 1;
        await noticeStore.readNotice(targetIndex);
        expect(spyReadNotice).not.toBeCalled();
      });
    });
  });
});
