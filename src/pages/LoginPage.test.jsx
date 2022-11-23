import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import context from 'jest-plugin-context';
import LoginPage from './LoginPage';

const navigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => (
    navigate
  ),
}));

let loginErrorMessage;
let login;
jest.mock('../hooks/useUserStore', () => () => ({
  loginErrorMessage,
  login,
}));

// const register = jest.fn();
// const handleSubmit = jest.fn();
// jest.mock('react-hook-form', () => ({
//   useForm: () => ({
//     register,
//     handleSubmit,
//   }),
// }));

describe('LoginPage', () => {
  const renderLoginPage = () => {
    render((
      <LoginPage />
    ));
  };

  context('폼을 채우고 로그인 버튼을 누르면', () => {
    login = jest.fn();

    it('userStore의 login 메서드를 호출', async () => {
      renderLoginPage();

      fireEvent.change(screen.getByLabelText('아이디'), {
        target: { value: 'hsjkdss228' },
      });
      fireEvent.change(screen.getByLabelText('비밀번호'), {
        target: { value: 'Password!1' },
      });

      fireEvent.click(screen.getByText('로그인'));

      await waitFor(() => {
        expect(login).toBeCalledTimes(1);
      });
    });

    context('로그인 결과로 Access Token이 반환되었으면', () => {
      login = jest.fn(() => 'ACCESS TOKEN');

      it('HomePage로 이동하는 navigate 함수 호출', async () => {
        renderLoginPage();

        fireEvent.change(screen.getByLabelText('아이디'), {
          target: { value: 'hsjkdss228' },
        });
        fireEvent.change(screen.getByLabelText('비밀번호'), {
          target: { value: 'Password!1' },
        });

        fireEvent.click(screen.getByText('로그인'));

        await waitFor(() => {
          expect(navigate).toBeCalledWith('/');
        });
      });
    });
  });
});
