import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import NoticeList from './NoticeList';

let noticesAll;
let noticesUnread;
let noticeStateToShown;
let selectNoticeMode;
let selectedNotices;
let isOpenedNotice;
const fetchNotices = jest.fn();
const closeSelectNoticeMode = jest.fn();
jest.mock('../hooks/useNoticeStore', () => () => ({
  noticesAll,
  noticesUnread,
  noticeStateToShown,
  selectNoticeMode,
  selectedNotices,
  isOpenedNotice,
  closeSelectNoticeMode,
  fetchNotices,
}));

describe('NoticeList', () => {
  function renderNoticeList() {
    render((
      <NoticeList />
    ));
  }

  context('알림 목록 컴포넌트가 렌더링되면', () => {
    beforeEach(() => {
      noticesAll = [];
      noticesUnread = [];
      selectNoticeMode = false;
      selectedNotices = [];
      isOpenedNotice = [];
    });

    it('알림 선택 모드를 비활성화 상태로 변경하고, 알림 목록을 서버에서 가져오는 함수 호출', () => {
      renderNoticeList();

      expect(closeSelectNoticeMode).toBeCalled();
      expect(fetchNotices).toBeCalled();
    });
  });

  // TODO: 시간 출력 내용 방식이 변경되면 테스트도 변경되어야 함
  context('알림 선택 모드가 아닌 경우', () => {
    beforeEach(() => {
      noticesAll = [
        {
          id: 1,
          status: 'unread',
          createdAt: '2022-12-17T05:03:21.783Z',
          title: '알림 제목 1',
          detail: '알림 상세 내용 1',
        },
        {
          id: 2,
          status: 'read',
          createdAt: '2022-12-17T04:03:21.783Z',
          title: '알림 제목 2',
          detail: '알림 상세 내용 2',
        },
        {
          id: 3,
          status: 'deleted',
          createdAt: '2022-12-17T03:03:21.783Z',
          title: '알림 제목 3',
          detail: '알림 상세 내용 3',
        },
      ];
      noticesUnread = [
        {
          id: 1,
          status: 'unread',
          createdAt: '2022-12-17T05:03:21.783Z',
          title: '알림 제목 1',
          detail: '알림 상세 내용 1',
        },
      ];
      selectNoticeMode = false;
      selectedNotices = [false, false, false];
      isOpenedNotice = [false, false, false];
    });

    context('알림 목록이 존재하고 모든 알림을 조회하는 경우', () => {
      beforeEach(() => {
        noticeStateToShown = 'all';
      });

      it('모든 알림 목록을 출력', () => {
        renderNoticeList();

        screen.getByText('알림 제목 1');
        screen.getByText('알림 제목 2');
        screen.getByText('알림 제목 3');
      });

      it('알림 선택 기능 관련 컴포넌트들은 출력되지 않음', () => {
        renderNoticeList();

        expect(screen.queryByText('전체선택')).toBe(null);
        expect(screen.queryByText('초기화')).toBe(null);
        expect(screen.queryByText('읽은 알림으로 처리')).toBe(null);
        expect(screen.queryByText('삭제')).toBe(null);
      });

      context('조회 가능한 알림이 없는 경우', () => {
        beforeEach(() => {
          noticesAll = [];
          noticesUnread = [];
          selectedNotices = [];
          isOpenedNotice = [];
        });

        it('조회 가능한 알림이 없다는 메시지를 출력', () => {
          renderNoticeList();

          screen.getByText('조회 가능한 알림이 없습니다.');
        });
      });
    });

    context('읽지 않은 알림 목록이 존재하고 읽지 않은 알림만 조회하는 경우', () => {
      beforeEach(() => {
        noticeStateToShown = 'unread';
        selectedNotices = [false];
        isOpenedNotice = [false];
      });

      it('읽지 않은 알림 목록을 출력', () => {
        renderNoticeList();

        screen.getByText('알림 제목 1');
        expect(screen.queryByText('알림 제목 2')).toBe(null);
        expect(screen.queryByText('알림 제목 3')).toBe(null);
      });

      context('읽지 않은 알림이 없는 경우', () => {
        beforeEach(() => {
          noticesUnread = [];
          selectedNotices = [];
          isOpenedNotice = [];
        });

        it('읽지 않은 알림이 없다는 메시지를 출력', () => {
          renderNoticeList();

          screen.getByText('읽지 않은 알림이 없습니다.');
        });
      });
    });
  });

  context('알림 선택 모드인 경우', () => {
    beforeEach(() => {
      noticesAll = [
        {
          id: 1,
          status: 'unread',
          createdAt: '2022-12-17T05:03:21.783Z',
          title: '알림 제목 1',
          detail: '알림 상세 내용 1',
        },
      ];
      noticesUnread = [
        {
          id: 1,
          status: 'unread',
          createdAt: '2022-12-17T05:03:21.783Z',
          title: '알림 제목 1',
          detail: '알림 상세 내용 1',
        },
      ];
      noticeStateToShown = 'all';
      selectNoticeMode = true;
      selectedNotices = [false];
      isOpenedNotice = [false];
    });

    it('알림 선택 기능 번호 컴포넌트, 선택할 알림 처리 컴포넌트 출력', () => {
      renderNoticeList();

      screen.getByText('전체선택');
      screen.getByText('초기화');
      screen.getByText('읽은 알림으로 처리');
      screen.getByText('삭제');
    });
  });
});
