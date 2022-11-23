import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import LoginErrors from './LoginErrors';

describe('LoginErrors', () => {
  const renderLoginErrors = (
    loginFormError,
    loginProcessError,
  ) => {
    render((
      <LoginErrors
        loginFormError={loginFormError}
        loginProcessError={loginProcessError}
      />
    ));
  };

  context('로그인 폼 에러 메세지가 전달되면', () => {
    context('아이디를 입력하지 않았을 경우', () => {
      const loginFormError = {
        identifier: {
          message: '아이디를 입력해주세요.',
        },
      };
      const loginProcessError = '';

      it('아이디가 없다는 예외 메시지 출력', () => {
        renderLoginErrors(
          loginFormError,
          loginProcessError,
        );

        screen.getByText('아이디를 입력해주세요.');
        expect(screen.queryByText('비밀번호를 입력해주세요.')).toBe(null);
      });
    });

    context('비밀번호를 입력하지 않았을 경우', () => {
      const loginFormError = {
        password: {
          message: '비밀번호를 입력해주세요.',
        },
      };
      const loginProcessError = '';

      it('비밀번호가 없다는 예외 메시지 출력', () => {
        renderLoginErrors(
          loginFormError,
          loginProcessError,
        );

        screen.getByText('비밀번호를 입력해주세요.');
        expect(screen.queryByText('아이디를 입력해주세요.')).toBe(null);
      });
    });
  });

  context('로그인 백엔드 에러 메세지가 전달되면', () => {
    context('잘못된 아이디를 입력했을 경우', () => {
      const loginFormError = {};
      const loginProcessError = '존재하지 않는 아이디입니다.';

      it('존재하지 않는 아이디라는 예외 메시지 출력', () => {
        renderLoginErrors(
          loginFormError,
          loginProcessError,
        );

        screen.getByText('존재하지 않는 아이디입니다.');
      });
    });

    context('잘못된 비밀번호를 입력했을 경우', () => {
      const loginFormError = {};
      const loginProcessError = '비밀번호가 일치하지 않습니다.';

      it('비밀번호가 일치하지 않는다는 예외 메시지 출력', () => {
        renderLoginErrors(
          loginFormError,
          loginProcessError,
        );

        screen.getByText('비밀번호가 일치하지 않습니다.');
      });
    });
  });

  context('로그인 폼, 백엔드 에러 메세지가 동시에 전달되면', () => {
    const loginFormError = {
      identifier: {
        message: '아이디를 입력해주세요.',
      },
    };
    const loginProcessError = '비밀번호가 일치하지 않습니다.';

    it('로그인 폼 에러 메세지를 출력', () => {
      renderLoginErrors(
        loginFormError,
        loginProcessError,
      );

      screen.getByText('아이디를 입력해주세요.');
      expect(screen.queryByText('비밀번호가 일치하지 않습니다.')).toBe(null);
    });
  });
});
