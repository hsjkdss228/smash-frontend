import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import Notices from './Notices';

describe('Notices', () => {
  const navigateBackward = jest.fn();
  const showAll = jest.fn();
  const showUnreadOnly = jest.fn();
  const showNoticeDetail = jest.fn();

  function renderNotices({
    notices,
    noticeStateToShow,
    noticesDetailState,
  }) {
    render((
      <Notices
        navigateBackward={navigateBackward}
        notices={notices}
        noticeStateToShow={noticeStateToShow}
        showAll={showAll}
        showUnreadOnly={showUnreadOnly}
        noticesDetailState={noticesDetailState}
        showNoticeDetail={showNoticeDetail}
      />
    ));
  }

  context('알림 데이터가 없거나 불러와지지 않았으면', () => {
    const notices = [];
    const noticeStateToShow = 'all';
    const noticesDetailState = [];

    it('조회할 알림이 없다는 메시지 출력', () => {
      renderNotices({
        notices,
        noticeStateToShow,
        noticesDetailState,
      });

      screen.getByText(/조회 가능한 알림이 없습니다./);
    });
  });

  context('알림 데이터가 전달되었을 경우', () => {
    const notices = [
      {
        id: 1,
        status: 'unread',
        createdAt: '1시간 전',
        title: '내가 신청한 운동 모집 게시글의 작성자가 신청을 수락했습니다.',
        detail: '신청한 게임 시간',
      },
      {
        id: 2,
        status: 'read',
        createdAt: '2시간 전',
        title: '내가 작성한 운동 모집 게시글에 새로운 참가 신청이 있습니다.',
        detail: '등록한 신청자: 황인우',
      },
    ];
    const noticeStateToShow = 'all';
    const noticesDetailState = [false, false];

    it('알림 리스트를 출력', () => {
      renderNotices({
        notices,
        noticeStateToShow,
        noticesDetailState,
      });

      screen.getByText(/작성자가 신청을 수락했습니다/);
      screen.getByText(/새로운 참가 신청이 있습니다/);
    });

    context('읽지 않은 알림만 조회하는 경우', () => {
      const unread = 'unread';

      it('전체 리스트에서 읽지 않은 상태의 알림만 리스트로 출력', () => {
        renderNotices({
          notices,
          noticeStateToShow: unread,
          noticesDetailState,
        });

        screen.getByText(/작성자가 신청을 수락했습니다/);
        expect(screen.queryByText(/새로운 참가 신청이 있습니다/)).toBe(null);
      });
    });

    context('읽지 않은 알림이 없을 경우', () => {
      const noticesAllRead = [
        {
          id: 1,
          status: 'read',
          createdAt: '1시간 전',
          title: '내가 신청한 운동 모집 게시글의 작성자가 신청을 수락했습니다.',
          detail: '신청한 게임 시간',
        },
        {
          id: 2,
          status: 'read',
          createdAt: '2시간 전',
          title: '내가 작성한 운동 모집 게시글에 새로운 참가 신청이 있습니다.',
          detail: '등록한 신청자: 황인우',
        },
      ];
      const unread = 'unread';

      it('읽지 않은 알림이 없다는 메시지를 출력', () => {
        renderNotices({
          notices: noticesAllRead,
          noticeStateToShow: unread,
          noticesDetailState,
        });

        screen.getByText(/읽지 않은 알림이 없습니다./);
      });
    });
  });
});
