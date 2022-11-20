import {
  fireEvent, render, screen,
} from '@testing-library/react';

import context from 'jest-plugin-context';
import { MemoryRouter } from 'react-router-dom';

import Header from './Header';

const changeUserId = jest.fn();
let login;
jest.mock('../hooks/useUserStore', () => () => ({
  changeUserId,
  login,
}));

describe('Header', () => {
  const renderHeader = () => {
    render((
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    ));
  };

  context('헤더 컴포넌트 확인 시', () => {
    it('애플리케이션 이름 출력', () => {
      renderHeader();

      screen.getByText(/SMASH/);
    });

    context('로그인이 되어있지 않은 경우', () => {
      it('User 식별자 입력란, 로그인 버튼 출력', () => {
        localStorage.setItem('accessToken', '');
        renderHeader();

        screen.getByLabelText('User Id:');
        screen.getByText('로그인');
      });

      context('값을 입력할 경우', () => {
        it('입력한 user Id 값을 변경하는 UserStore의 changeUserId 함수 호출', async () => {
          localStorage.setItem('accessToken', '');
          renderHeader();

          // await act(() => {
          fireEvent.change(screen.getByLabelText(/User Id/), {
            target: { value: 2 },
          });
          expect(changeUserId).toBeCalledWith(2);
          // });
        });
      });

      context('로그인 버튼을 누를 경우', () => {
        const expectedAccessToken = 'VALID ACCESS TOKEN';

        it('accessToken을 받아오기 위한 UserStore의 login 함수 호출', async () => {
          login = jest.fn(() => expectedAccessToken);
          localStorage.setItem('accessToken', '');
          renderHeader();

          // await act(() => {
          fireEvent.click(screen.getByText('로그인'));

          expect(login).toBeCalled();
          // });
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

          // await act(() => {
          fireEvent.click(screen.getByText('로그아웃'));
          const accessToken = localStorage.getItem('accessToken');
          expect(JSON.parse(accessToken)).toBe('');
          // });
        });
      });
    });
  });
});
