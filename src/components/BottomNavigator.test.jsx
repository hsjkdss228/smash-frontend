import { fireEvent, render, screen } from '@testing-library/react';

import context from 'jest-plugin-context';
import ReactModal from 'react-modal';

import BottomNavigator from './BottomNavigator';

let mockPath = '/path';
const navigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    pathname: mockPath,
  }),
  useNavigate: () => (
    navigate
  ),
}));

describe('BottomNavigator', () => {
  function renderBottomNavigator() {
    render((
      <BottomNavigator />
    ));
  }

  context('네비게이터 화면의 각 버튼 클릭 시', () => {
    context('로그인 상태에서는', () => {
      beforeEach(() => {
        mockPath = '/path';
        localStorage.setItem('accessToken', JSON.stringify('ACCESS TOKEN'));
      });

      it('각 기능 페이지로 이동하는 navigate 함수 호출', () => {
        renderBottomNavigator();

        fireEvent.click(screen.getByText('홈'));
        expect(navigate).toBeCalledWith('/');

        fireEvent.click(screen.getByText('글쓰기'));
        expect(navigate).toBeCalledWith('/write', {
          state: {
            previousPath: mockPath,
          },
        });

        fireEvent.click(screen.getByText('채팅'));
        expect(navigate).toBeCalledWith('/chat', {
          state: {
            previousPath: mockPath,
          },
        });
      });
    });

    context('로그인하지 않았을 경우', () => {
      beforeEach(() => {
        mockPath = '/path';
        localStorage.setItem('accessToken', JSON.stringify(''));
        ReactModal.setAppElement('*');
      });

      it('로그인 시에만 사용 가능한 기능으로 이동 시도 시 로그인 필요 안내 Modal 출력', () => {
        renderBottomNavigator();

        fireEvent.click(screen.getByText('글쓰기'));
        screen.getByText('로그인이 필요합니다.');
      });

      context('Modal에서', () => {
        it('로그인 버튼 클릭 시 로그인 페이지로 이동하는 navigate 함수 호출', () => {
          renderBottomNavigator();

          fireEvent.click(screen.getByText('글쓰기'));
          fireEvent.click(screen.getByText('로그인'));
          expect(navigate).toBeCalledWith('/login', {
            state: {
              previousPath: mockPath,
            },
          });
        });

        it('체험용 계정 선택 버튼 클릭 시 해당 페이지로 이동하는 navigate 함수 호출', () => {
          renderBottomNavigator();

          fireEvent.click(screen.getByText('채팅'));
          fireEvent.click(screen.getByText('체험용 계정 선택'));
          expect(navigate).toBeCalledWith('/trial-account', {
            state: {
              previousPath: mockPath,
            },
          });
        });
      });
    });
  });
});
