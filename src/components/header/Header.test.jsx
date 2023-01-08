import {
  fireEvent, render, screen,
} from '@testing-library/react';

import context from 'jest-plugin-context';

import Header from './Header';

const mockPath = '/path';
const navigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    pathname: mockPath,
  }),
  useNavigate: () => (
    navigate
  ),
}));

let name;
const fetchUserName = jest.fn();
jest.mock('../hooks/useUserStore', () => () => ({
  name,
  fetchUserName,
}));

let unreadNoticeCount;
const fetchUnreadNoticeCount = jest.fn();
jest.mock('../hooks/useNoticeStore', () => () => ({
  unreadNoticeCount,
  fetchUnreadNoticeCount,
}));

describe('Header', () => {
  function renderHeader() {
    render((
      <Header />
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('헤더 컴포넌트 확인 시', () => {
    it('애플리케이션 이름 출력', () => {
      renderHeader();

      screen.getByText(/SMASH/);
    });

    context('로그인이 되어있지 않은 경우', () => {
      beforeEach(() => {
        localStorage.setItem('accessToken', JSON.stringify(''));
      });

      it('로그인 페이지, 체험용 계정 선택 이동 링크 버튼 출력', () => {
        renderHeader();

        screen.getByText('체험용 계정 선택');
        screen.getByText('로그인');
      });

      it('로그인 버튼 클릭 시 로그인 페이지로 이동하는 navigate 함수 호출', async () => {
        renderHeader();

        fireEvent.click(screen.getByText('로그인'));
        expect(navigate).toBeCalledWith('/login', {
          state: {
            previousPath: mockPath,
          },
        });
      });

      it('체험용 계정 선택 버튼 클릭 시 해당 페이지로 이동하는 navigate 함수 호출', async () => {
        renderHeader();

        fireEvent.click(screen.getByText('체험용 계정 선택'));
        expect(navigate).toBeCalledWith('/trial-account', {
          state: {
            previousPath: mockPath,
          },
        });
      });
    });
  });

  context('로그인이 되어있는 경우', () => {
    beforeEach(() => {
      localStorage.setItem('accessToken', JSON.stringify('TOKEN'));
      name = '치코리타';
      unreadNoticeCount = 10;
    });

    it('사용자 이름 출력', () => {
      renderHeader();

      screen.getByText('치코리타 님');
    });

    it('알림 목록 확인으로 이동 버튼 및 읽지 않은 알림 개수 출력', () => {
      renderHeader();

      screen.getByText('알림');
      screen.getByText(/10/);
    });

    context('읽지 않은 알림 개수가 없는 경우', () => {
      beforeEach(() => {
        unreadNoticeCount = 0;
      });

      it('읽지 않은 알림 개수를 출력하지 않음', () => {
        renderHeader();

        expect(screen.queryByText(/\(/)).toBe(null);
      });
    });

    // context('읽지 않은 알림 개수에 변동이 생길 경우', () => {
    //   beforeEach(() => {
    //     unreadNoticeCount = 2;
    //   });

    //   it('읽지 않은 알림 개수를 fetch하는 함수를 다시 호출', async () => {
    //     renderHeader();

    //     expect(fetchUnreadNoticeCount).toBeCalledTimes(1);

    //     unreadNoticeCount -= 1;
    //     await waitFor(() => {
    //       expect(fetchUnreadNoticeCount).toBeCalledTimes(2);
    //     });
    //   });
    // });

    context('알림 목록 확인으로 이동 버튼을 누를 경우', () => {
      it('알림 목록 확인 페이지로 이동하는 navigate 함수 호출', () => {
        renderHeader();

        fireEvent.click(screen.getByText('알림'));
        expect(navigate).toBeCalledWith('/notices', {
          state: {
            previousPath: mockPath,
          },
        });
      });
    });

    it('마이페이지 이동 버튼 출력', () => {
      renderHeader();

      screen.getByText('마이페이지');
    });

    // TODO: 마이페이지 기능 추가 시 마이페이지 페이지로 navigate 호출 테스트
    context('마이페이지 이동 버튼을 누를 경우', () => {
      it('아무것도 하지 않음', () => {
        renderHeader();

        fireEvent.click(screen.getByText('마이페이지'));
      });
    });

    it('로그아웃 버튼 출력', () => {
      renderHeader();

      screen.getByText('로그아웃');
    });

    context('로그아웃 버튼을 누를 경우', () => {
      it('accessToken을 비움', async () => {
        renderHeader();

        fireEvent.click(screen.getByText('로그아웃'));
        const accessToken = localStorage.getItem('accessToken');
        expect(JSON.parse(accessToken)).toBe('');
      });
    });
  });
});
