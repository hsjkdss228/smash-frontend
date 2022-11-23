import {
  fireEvent, render, screen,
} from '@testing-library/react';

import context from 'jest-plugin-context';

import Header from './Header';

const navigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => (
    navigate
  ),
}));

describe('Header', () => {
  const renderHeader = () => {
    render((
      <Header />
    ));
  };

  context('헤더 컴포넌트 확인 시', () => {
    it('애플리케이션 이름 출력', () => {
      renderHeader();

      screen.getByText(/SMASH/);
    });

    context('로그인이 되어있지 않은 경우', () => {
      it('로그인 페이지 이동 링크 버튼 출력', () => {
        localStorage.setItem('accessToken', '');
        renderHeader();

        screen.getByText('LOGIN');
      });

      context('로그인 버튼을 누를 경우', () => {
        it('로그인 페이지로 이동하는 navigate 함수 호출', async () => {
          localStorage.setItem('accessToken', '');
          renderHeader();

          fireEvent.click(screen.getByText('LOGIN'));

          expect(navigate).toBeCalledWith('/login');
        });
      });
    });

    context('로그인이 되어있는 경우', () => {
      it('로그아웃 버튼 출력', () => {
        localStorage.setItem('accessToken', JSON.stringify('TOKEN'));
        renderHeader();

        screen.getByText('로그아웃');
      });

      context('로그아웃 버튼을 누를 경우', () => {
        it('accessToken을 비움', async () => {
          localStorage.setItem('accessToken', JSON.stringify('TOKEN'));
          renderHeader();

          fireEvent.click(screen.getByText('로그아웃'));
          const accessToken = localStorage.getItem('accessToken');
          expect(JSON.parse(accessToken)).toBe('');
        });
      });
    });
  });
});
