import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import NoticeSelectMethodButtons from './NoticeSelectMethodButtons';

const selectAllNotices = jest.fn();
const deselectAllNotices = jest.fn();
jest.mock('../hooks/useNoticeStore', () => () => ({
  selectAllNotices,
  deselectAllNotices,
}));

describe('NoticeSelectMethodButtons', () => {
  function renderNoticeSelectMethodButtons() {
    render((
      <NoticeSelectMethodButtons />
    ));
  }

  context('알림 선택 방식 화면은', () => {
    it('전체선택, 초기화 버튼으로 구성됨', () => {
      renderNoticeSelectMethodButtons();

      screen.getByText('전체선택');
      screen.getByText('초기화');
    });
  });

  context('전체선택 버튼을 누르면', () => {
    it('알림 전체를 선택하는 함수 호출', () => {
      renderNoticeSelectMethodButtons();

      fireEvent.click(screen.getByText('전체선택'));
      expect(selectAllNotices).toBeCalled();
    });
  });

  context('초기화 버튼을 누르면', () => {
    it('알림 전체 선택 상태를 초기화하는 함수 호출', () => {
      renderNoticeSelectMethodButtons();

      fireEvent.click(screen.getByText('초기화'));
      expect(deselectAllNotices).toBeCalled();
    });
  });
});
