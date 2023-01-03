import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import context from 'jest-plugin-context';
import LoginPage from './LoginPage';

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

let login;
const clearLoginError = jest.fn();
jest.mock('../hooks/useUserStore', () => () => ({
  clearLoginError,
  login,
}));

describe('LoginPage', () => {
  function renderLoginPage() {
    render((
      <LoginPage />
    ));
  }

  context('로그인 화면에서', () => {
    context('정상적으로 내용을 입력하고 로그인을 마치면', () => {
      const fillInput = () => {
        fireEvent.change(screen.getByLabelText('아이디'), {
          target: { value: 'hsjkdss228' },
        });
        fireEvent.change(screen.getByLabelText('비밀번호'), {
          target: { value: 'Password!1' },
        });
      };

      beforeEach(() => {
        const expectedVerifiedAccessToken = 'TOKEN';
        login = jest.fn(() => expectedVerifiedAccessToken);
      });

      context('이전에 접속했었던 화면의 경로가 존재할 경우', () => {
        beforeEach(() => {
          location = {
            state: {
              previousPath: '/posts',
            },
          };

          jest.clearAllMocks();
        });

        it('접속하기 이전의 주소로 navigate', async () => {
          renderLoginPage();

          fillInput();
          fireEvent.click(screen.getByText('LOGIN'));

          await waitFor(() => {
            expect(navigate).toBeCalledWith('/posts');
          });
        });
      });

      context('주소로 직접 접근했었을 경우', () => {
        beforeEach(() => {
          location = {
            state: null,
          };

          jest.clearAllMocks();
        });

        it('홈 화면 주소로 navigate', async () => {
          renderLoginPage();

          fillInput();
          fireEvent.click(screen.getByText('LOGIN'));

          await waitFor(() => {
            expect(navigate).toBeCalledWith('/');
          });
        });
      });
    });

    context('회원가입 버튼을 누를 경우', () => {
      const currentPath = '/login';
      beforeEach(() => {
        location = {
          state: {
            previousPath: null,
          },
          pathname: currentPath,
        };

        jest.clearAllMocks();
      });

      it('회원가입 화면 주소로 navigate, 이때 현재 페이지의 주소를 state로 같이 전달', () => {
        renderLoginPage();

        fireEvent.click(screen.getByText('회원가입'));
        expect(navigate).toBeCalledWith('/signup', {
          state: {
            previousPath: currentPath,
          },
        });
      });
    });
  });
});
