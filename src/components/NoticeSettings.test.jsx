import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import NoticeSettings from './NoticeSettings';

let selectNoticeMode;
let showAllNoticesMode;
let showUnreadNoticesMode;
const toggleSelectNoticeMode = jest.fn();
const showAll = jest.fn();
const showUnreadOnly = jest.fn();
jest.mock('../hooks/useNoticeStore', () => () => ({
  selectNoticeMode,
  showAllNoticesMode,
  showUnreadNoticesMode,
  toggleSelectNoticeMode,
  showAll,
  showUnreadOnly,
}));

describe('NoticeSettings', () => {
  function renderNoticeSettings() {
    render((
      <NoticeSettings />
    ));
  }

  context('알림 선택 기능 활성화 및 조회할 알림 종류 선택 컴포넌트는', () => {
    beforeEach(() => {
      selectNoticeMode = false;
      showAllNoticesMode = true;
      showUnreadNoticesMode = false;
    });

    it('알림 선택, 모든 알림 확인, 읽지 않은 알림만 확인 버튼으로 구성됨', () => {
      renderNoticeSettings();

      screen.getByText('알림 선택');
      screen.getByText('모든 알림 확인');
      screen.getByText('읽지 않은 알림만 확인');
    });
  });

  context('알림 선택 모드 활성화 버튼을 클릭하는 경우', () => {
    beforeEach(() => {
      selectNoticeMode = true;
      showAllNoticesMode = true;
      showUnreadNoticesMode = false;
    });

    it('알림 선택 모드 상태를 변경하는 함수 호출', () => {
      renderNoticeSettings();

      fireEvent.click(screen.getByText('알림 선택'));
      expect(toggleSelectNoticeMode).toBeCalled();
    });
  });

  context('모든 알림 확인 버튼을 클릭하는데', () => {
    context('읽지 않은 알림 확인 모드가 활성화된 상태인 경우', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        selectNoticeMode = true;
        showAllNoticesMode = false;
        showUnreadNoticesMode = true;
      });

      it('모든 알림 확인 모드를 활성화하는 함수 호출', () => {
        renderNoticeSettings();

        fireEvent.click(screen.getByText('모든 알림 확인'));
        expect(showAll).toBeCalled();
      });
    });

    context('모든 알림 확인 모드가 활성화된 상태인 경우', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        selectNoticeMode = false;
        showAllNoticesMode = true;
        showUnreadNoticesMode = false;
      });

      it('아무런 동작도 하지 않음', () => {
        renderNoticeSettings();

        fireEvent.click(screen.getByText('모든 알림 확인'));
        expect(showAll).not.toBeCalled();
      });
    });
  });

  context('읽지 않은 알림 확인 버튼을 클릭하는데', () => {
    context('모든 알림 확인 모드가 활성화된 상태인 경우', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        selectNoticeMode = false;
        showAllNoticesMode = true;
        showUnreadNoticesMode = false;
      });

      it('읽지 않은 알림 확인 모드를 활성화하는 함수 호출', () => {
        renderNoticeSettings();

        fireEvent.click(screen.getByText('읽지 않은 알림만 확인'));
        expect(showUnreadOnly).toBeCalled();
      });
    });

    context('읽지 않은 알림 확인 모드가 활성화된 상태인 경우', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        selectNoticeMode = false;
        showAllNoticesMode = false;
        showUnreadNoticesMode = true;
      });

      it('아무런 동작도 하지 않음', () => {
        renderNoticeSettings();

        fireEvent.click(screen.getByText('모든 알림 확인'));
        expect(showUnreadOnly).not.toBeCalled();
      });
    });
  });
});
