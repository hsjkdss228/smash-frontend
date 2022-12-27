import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import context from 'jest-plugin-context';
import SignUpPage from './SignUpPage';

let location;
const navigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useLocation: () => (
    location
  ),
  useNavigate: () => (
    navigate
  ),
}));

const clearSignUpError = jest.fn();
let signUp;
let login;
jest.mock('../hooks/useUserStore', () => () => ({
  clearSignUpError,
  signUp,
  login,
}));

describe('SignUpPage', () => {
  function renderSignUpPage() {
    render((
      <SignUpPage />
    ));
  }

  const previousPath = '/login';

  beforeEach(() => {
    localStorage.setItem('accessToken', JSON.stringify(''));

    location = {
      state: {
        previousPath,
      },
    };
  });

  context('회원가입 페이지에서', () => {
    context('뒤로가기 버튼을 누르면', () => {
      context('이전에 접속했었던 화면의 경로가 존재할 경우', () => {
        it('접속하기 이전의 주소로 navigate', () => {
          renderSignUpPage();

          fireEvent.click(screen.getByText('뒤로가기'));
          expect(navigate).toBeCalledWith(previousPath);
        });
      });

      context('주소로 직접 접근했었을 경우', () => {
        beforeEach(() => {
          location = {
            state: null,
          };
        });

        it('홈 화면 주소로 navigate', () => {
          renderSignUpPage();

          fireEvent.click(screen.getByText('뒤로가기'));
          expect(navigate).toBeCalledWith('/');
        });
      });
    });

    context('내용 입력을 정상적으로 마친 상태에서 회원가입 버튼을 누르면', () => {
      const name = '황인우';
      const username = 'hsjkdss228';
      const password = 'Password!1';
      const confirmPassword = 'Password!1';
      const gender = '남성';
      const phoneNumber = '01098765432';
      const verifiedAccessToken = 'TOKEN';
      beforeEach(() => {
        signUp = jest.fn(() => name);
        login = jest.fn(() => verifiedAccessToken);
      });

      it('회원가입을 마치고, 해당 정보로 로그인한 뒤, 회원가입 완료 페이지로 navigate', async () => {
        renderSignUpPage();

        fireEvent.change(screen.getByLabelText('성함'), {
          target: { value: name },
        });
        fireEvent.change(screen.getByLabelText('아이디'), {
          target: { value: username },
        });
        fireEvent.change(screen.getByLabelText('비밀번호'), {
          target: { value: password },
        });
        fireEvent.change(screen.getByLabelText('비밀번호 확인'), {
          target: { value: confirmPassword },
        });
        fireEvent.click(screen.getByLabelText('남성'));
        fireEvent.change(screen.getByLabelText('전화번호'), {
          target: { value: phoneNumber },
        });

        fireEvent.click(screen.getByText('회원가입'));
        await waitFor(() => {
          expect(signUp).toBeCalledWith({
            name,
            username,
            password,
            confirmPassword,
            gender,
            phoneNumber,
          });
          expect(login).toBeCalledWith({
            username,
            password,
          });
          expect(navigate).toBeCalledWith('/welcome', {
            state: {
              enrolledName: name,
            },
          });
        });
      });
    });
  });
});
