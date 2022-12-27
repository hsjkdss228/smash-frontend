import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import Notices from './Notices';

let serverError;
jest.mock('../hooks/useNoticeStore', () => () => ({
  serverError,
}));

jest.mock('./NoticeList', () => jest.fn());

describe('Notices', () => {
  const navigateBackward = jest.fn();

  function renderNotices() {
    render((
      <Notices
        navigateBackward={navigateBackward}
      />
    ));
  }

  beforeEach(() => {
    serverError = '';
  });

  context('알림 목록 전체 컴포넌트 화면에서 뒤로가기 버튼을 누르면', () => {
    it('뒤로 가기를 수행하게 하는 핸들러 함수 호출', () => {
      renderNotices();

      fireEvent.click(screen.getByText('뒤로가기'));
      expect(navigateBackward).toBeCalled();
    });
  });

  context('서버에서 에러가 발생해 에러 상태값이 서버에 저장되어 있을 경우', () => {
    beforeEach(() => {
      serverError = 'Authentication Error';
    });

    it('알림 목록 화면 대신 에러 메시지를 화면에 출력', () => {
      renderNotices();

      expect(screen.getByText('올비르지 않은 사용자 정보입니다.'));
      expect(screen.queryByText('알림 선택')).toBe(null);
    });
  });
});
