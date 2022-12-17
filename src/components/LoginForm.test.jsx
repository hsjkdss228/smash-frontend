import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import context from 'jest-plugin-context';
import LoginForm from './LoginForm';

let loginServerError;
const clearLoginError = jest.fn();
let login;
jest.mock('../hooks/useUserStore', () => () => ({
  loginServerError,
  clearLoginError,
  login,
}));

describe('LoginForm', () => {
  jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');
  Object.setPrototypeOf(window.localStorage.setItem, jest.fn());

  const navigateBackward = jest.fn();
  const navigateSignUp = jest.fn();

  function renderLoginForm() {
    render((
      <LoginForm
        navigateBackward={navigateBackward}
        navigateSignUp={navigateSignUp}
      />
    ));
  }

  context('로그인 페이지에서는', () => {
    it('최초 접속 시 기존에 있었던 서버 발생 에러 상태를 비우는 함수를 호출', () => {
      renderLoginForm();

      expect(clearLoginError).toBeCalled();
    });

    it('로고, 입력 필드, 로그인 버튼, 회원가입 버튼을 출력', () => {
      renderLoginForm();

      screen.getByText('우리들의 스포츠 매칭 시스템');
      screen.getByText('SMASH');
      screen.getByText('아이디');
      screen.getByText('비밀번호');
      screen.getByText('로그인');
      screen.getByText('회원가입');
    });

    context('뒤로가기 버튼을 누르면', () => {
      it('뒤로가기 핸들러 함수를 호출', () => {
        renderLoginForm();

        fireEvent.click(screen.getByText('뒤로가기'));
        expect(navigateBackward).toBeCalled();
      });
    });

    context('폼에 값을 입력하면', () => {
      it('폼의 내용이 변경됨', () => {
        renderLoginForm();

        fireEvent.change(screen.getByLabelText('아이디'), {
          target: { value: 'hsjkdss228' },
        });
        screen.getByDisplayValue('hsjkdss228');
        fireEvent.change(screen.getByLabelText('비밀번호'), {
          target: { value: 'Password!1' },
        });
        screen.getByDisplayValue('Password!1');
      });

      context('폼에 정상적인 아이디와 비밀번호를 값을 입력하고 로그인 버튼을 누르면', () => {
        beforeEach(() => {
          loginServerError = '';
          const expectedVerifiedAccessToken = 'TOKEN';
          login = jest.fn(() => expectedVerifiedAccessToken);
          jest.clearAllMocks();
        });

        it('로그인 핸들러 함수를 호출하면서 폼에 입력된 내용을 인자로 전달, '
          + '로그인 성공 후 직전 페이지로 이동', async () => {
          renderLoginForm();

          const username = 'hsjkdss228';
          const password = 'Password!1';

          fireEvent.change(screen.getByLabelText('아이디'), {
            target: { value: username },
          });
          fireEvent.change(screen.getByLabelText('비밀번호'), {
            target: { value: password },
          });
          fireEvent.submit(screen.getByText('로그인'));

          await waitFor(() => {
            expect(login).toBeCalledWith({ username, password });
            expect(navigateBackward).toBeCalled();
          });
        });
      });

      context('폼에 아이디나 비밀번호를 입력하지 않고 로그인 버튼을 누르면', () => {
        beforeEach(() => {
          jest.clearAllMocks();
        });

        it('로그인 핸들러 함수를 호출하지 않음', async () => {
          renderLoginForm();

          const username = 'hsjkdss228';

          fireEvent.change(screen.getByLabelText('아이디'), {
            target: { value: username },
          });
          fireEvent.submit(screen.getByText('로그인'));

          expect(login).not.toBeCalled();
        });
      });

      context('폼에 잘못된 아이디나 비밀번호를 값을 입력하고 로그인 버튼을 누르면', () => {
        beforeEach(() => {
          loginServerError = '존재하지 않는 아이디입니다.';
          login = jest.fn();
          jest.clearAllMocks();
        });

        it('로그인 핸들러 함수를 호출하면서 폼에 입력된 내용을 인자로 전달하지만 '
          + '로그인에 실패해 직전 페이지로 이동하지 않음', async () => {
          renderLoginForm();

          const username = 'wrongId12';
          const password = 'Password!1';

          fireEvent.change(screen.getByLabelText('아이디'), {
            target: { value: username },
          });
          fireEvent.change(screen.getByLabelText('비밀번호'), {
            target: { value: password },
          });
          fireEvent.submit(screen.getByText('로그인'));

          await waitFor(() => {
            expect(login).toBeCalledWith({ username, password });
            expect(navigateBackward).not.toBeCalled();
            screen.getByText('존재하지 않는 아이디입니다.');
          });
        });
      });
    });
  });
});
