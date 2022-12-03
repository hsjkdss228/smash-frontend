import { render } from '@testing-library/react';
import context from 'jest-plugin-context';
import NoticesPage from './NoticesPage';

const navigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => (
    navigate
  ),
}));

let notices;
let serverError;
const fetchNotices = jest.fn();
jest.mock('../hooks/useNoticeStore', () => () => ({
  notices,
  serverError,
  fetchNotices,
}));

describe('NoticesPage', () => {
  function renderNoticesPage() {
    render((
      <NoticesPage />
    ));
  }

  context('알림 목록 조회 페이지에 접속했을 경우', () => {
    context('로그인하지 않았을 경우', () => {
      beforeEach(() => {
        localStorage.setItem('accessToken', JSON.stringify(''));

        notices = [];
        serverError = '';
      });

      it('로그인 페이지로 navigate하는 함수 호출', () => {
        jest.clearAllMocks();
        renderNoticesPage();

        expect(navigate).toBeCalledWith('/login');
      });
    });

    context('로그인했을 경우', () => {
      beforeEach(() => {
        localStorage.setItem('accessToken', JSON.stringify('USER ID 1'));

        notices = [];
        serverError = '';
      });

      it('웹 서버로부터 사용자의 알림 데이터를 요청하는 fetchNotice 함수 호출', () => {
        jest.clearAllMocks();
        renderNoticesPage();

        expect(fetchNotices).toBeCalled();
      });
    });
  });
});
