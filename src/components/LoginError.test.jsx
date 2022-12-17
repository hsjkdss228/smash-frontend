import { render, screen } from '@testing-library/react';

import context from 'jest-plugin-context';

import LoginError from './LoginError';

describe('LoginErrors', () => {
  function renderLoginErrors(
    loginFormError,
    loginServerError,
  ) {
    render((
      <LoginError
        loginFormError={loginFormError}
        loginServerError={loginServerError}
      />
    ));
  }

  context('에러 메시지가 전달되면', () => {
    context('아이디를 입력하지 않은 에러인 경우', () => {
      const loginFormError = {
        username: {
          message: '아이디를 입력하지 않았습니다.',
        },
      };
      const loginServerError = '';

      it('아이디를 입력하지 않았다는 메시지를 출력', () => {
        renderLoginErrors(
          loginFormError,
          loginServerError,
        );

        screen.getByText('아이디를 입력하지 않았습니다.');
      });
    });

    context('비밀번호를 입력하지 않은 에러인 경우', () => {
      const loginFormError = {
        password: {
          message: '비밀번호를 입력하지 않았습니다.',
        },
      };
      const loginServerError = '';

      it('비밀번호를 입력하지 않았다는 메시지를 출력', () => {
        renderLoginErrors(
          loginFormError,
          loginServerError,
        );

        screen.getByText('비밀번호를 입력하지 않았습니다.');
      });
    });

    context('존재하지 않는 아이디인 경우', () => {
      const loginFormError = {};
      const loginServerError = '존재하지 않는 아이디입니다.';

      it('아이디가 존재하지 않는다는 메시지를 출력', () => {
        renderLoginErrors(
          loginFormError,
          loginServerError,
        );

        screen.getByText('존재하지 않는 아이디입니다.');
      });
    });

    context('비밀번호가 일치하지 않는 경우', () => {
      const loginFormError = {};
      const loginServerError = '비밀번호가 일치하지 않습니다.';

      it('비밀번호가 일치하지 않는다는 메시지를 출력', () => {
        renderLoginErrors(
          loginFormError,
          loginServerError,
        );

        screen.getByText('비밀번호가 일치하지 않습니다.');
      });
    });
  });
});
