import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const register = jest.fn();
  const handleSubmit = jest.fn();
  const login = jest.fn();

  const renderLoginForm = () => {
    render((
      <LoginForm
        register={register}
        handleSubmit={handleSubmit}
        login={login}
      />
    ));
  };

  context('로그인 폼이 나타나면', () => {
    it('아이디와 비밀번호를 입력할 수 있는 란이 있음', () => {
      renderLoginForm();

      screen.getByLabelText('아이디');
      screen.getByLabelText('비밀번호');
      screen.getByText('로그인');
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
    });
  });
});
