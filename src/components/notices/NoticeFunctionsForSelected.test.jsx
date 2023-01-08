import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import context from 'jest-plugin-context';

import NoticeFunctionsForSelected from './NoticeFunctionsForSelected';

const readSelectedNotices = jest.fn();
const deleteSelectedNotices = jest.fn();
jest.mock('../hooks/useNoticeStore', () => () => ({
  readSelectedNotices,
  deleteSelectedNotices,
}));

describe('NoticeFunctionsForSelected', () => {
  function renderNoticeFunectionsForSelected() {
    render((
      <NoticeFunctionsForSelected />
    ));
  }

  context('선택한 알림에 대한 기능 수행 버튼 컴포넌트에는', () => {
    it('읽은 알림으로 처리 버튼, 삭제 버튼이 존재', () => {
      renderNoticeFunectionsForSelected();

      screen.getByText('읽은 알림으로 처리');
      screen.getByText('삭제');
    });
  });

  context('읽은 알림으로 처리 버튼을 누르면', () => {
    it('알림들의 상태를 읽음으로 변경하는 Store의 함수 호출', async () => {
      renderNoticeFunectionsForSelected();

      fireEvent.click(screen.getByText('읽은 알림으로 처리'));
      await waitFor(() => {
        expect(readSelectedNotices).toBeCalled();
      });
    });
  });

  context('삭제 버튼을 누르면', () => {
    it('알림들의 상태를 삭제 상태로 변경하는 Store의 함수 호출', async () => {
      renderNoticeFunectionsForSelected();

      fireEvent.click(screen.getByText('삭제'));
      await waitFor(() => {
        expect(deleteSelectedNotices).toBeCalled();
      });
    });
  });
});
