import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import NoticesPage from './NoticesPage';

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

let noticesAll;
const noticeStateToShow = 'all';
const fetchNotices = jest.fn();
const closeSelectNoticeMode = jest.fn();
let serverError;
jest.mock('../hooks/useNoticeStore', () => () => ({
  noticesAll,
  noticeStateToShow,
  fetchNotices,
  closeSelectNoticeMode,
  serverError,
}));

describe('NoticesPage', () => {
  function renderNoticesPage() {
    render((
      <NoticesPage />
    ));
  }

  context('알림 목록 조회 페이지에', () => {
    context('로그인하지 않고 접속하는 경우', () => {
      beforeEach(() => {
        localStorage.setItem('accessToken', JSON.stringify(''));

        location = {
          state: null,
        };

        noticesAll = [];
        serverError = '';

        jest.clearAllMocks();
      });

      it('로그인 페이지로 navigate하는 함수 호출', () => {
        renderNoticesPage();

        expect(navigate).toBeCalledWith('/login');
      });
    });

    context('로그인한 상태로 접속해', () => {
      beforeEach(() => {
        localStorage.setItem('accessToken', JSON.stringify('TOKEN'));
      });

      context('출력되는 화면에서 뒤로가기 버튼을 눌렀을 경우', () => {
        context('이전에 접속했었던 화면의 경로가 존재할 경우', () => {
          const previousPath = '/wrtie';
          beforeEach(() => {
            location = {
              state: {
                previousPath,
              },
            };

            jest.clearAllMocks();
          });

          it('접속하기 이전의 주소로 navigate', () => {
            renderNoticesPage();

            fireEvent.click(screen.getByText('뒤로가기'));
            expect(navigate).toBeCalledWith(previousPath);
          });
        });

        context('주소로 직접 접근했었을 경우', () => {
          beforeEach(() => {
            location = {
              state: null,
            };

            jest.clearAllMocks();
          });

          it('홈 화면 주소로 navigate', () => {
            renderNoticesPage();

            fireEvent.click(screen.getByText('뒤로가기'));
            expect(navigate).toBeCalledWith('/');
          });
        });
      });
    });
  });
});
