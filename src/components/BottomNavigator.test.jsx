import { fireEvent, render, screen } from '@testing-library/react';

import context from 'jest-plugin-context';

import BottomNavigator from './BottomNavigator';

const navigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => (
    navigate
  ),
}));

describe('BottomNavigator', () => {
  function renderBottomNavigator() {
    render((
      <BottomNavigator />
    ));
  }

  context('하단 네비게이터에는', () => {
    it('홈, 글쓰기, 채팅 버튼이 출력됨', () => {
      renderBottomNavigator();

      screen.getByText(/홈/);
      screen.getByText(/글쓰기/);
      screen.getByText(/채팅/);
    });
  });

  context('각 버튼 클릭 시', () => {
    it('각 기능 페이지로 이동하는 navigate 함수 호출', () => {
      renderBottomNavigator();

      fireEvent.click(screen.getByText('홈'));
      expect(navigate).toBeCalledWith('/');

      fireEvent.click(screen.getByText('글쓰기'));
      expect(navigate).toBeCalledWith('/write');

      fireEvent.click(screen.getByText('채팅'));
      expect(navigate).toBeCalledWith('/chat');
    });
  });
});
