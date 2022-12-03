import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import Notices from './Notices';

describe('Notices', () => {
  const navigateBackward = jest.fn();
  function renderNotices({
    notices,
  }) {
    render((
      <Notices
        notices={notices}
        navigateBackward={navigateBackward}
      />
    ));
  }

  context('알림 데이터가 없거나 불러와지지 않았으면', () => {
    const notices = [];

    it('조회할 알림이 없다는 메시지 출력', () => {
      renderNotices({
        notices,
      });

      screen.getByText(/조회 가능한 알림이 없습니다./);
    });
  });

  context('알림 데이터가 전달되었을 경우', () => {
    const notices = [
      {
        id: 1,
        createdAt: '1시간 전',
        title: '내가 신청한 운동 모집 게시글의 작성자가 신청을 수락했습니다.',
      },
      {
        id: 2,
        createdAt: '2시간 전',
        title: '내가 작성한 운동 모집 게시글에 새로운 참가 신청이 있습니다.',
      },
    ];

    it('알림 리스트를 출력', () => {
      renderNotices({
        notices,
      });

      screen.getByText(/작성자가 신청을 수락했습니다/);
      screen.getByText(/새로운 참가 신청이 있습니다/);
    });
  });
});
