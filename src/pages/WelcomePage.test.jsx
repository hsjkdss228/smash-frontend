import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import WelcomePage from './WelcomePage';

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

describe('WelcomePage', () => {
  function renderWelcomePage() {
    render((
      <WelcomePage />
    ));
  }

  beforeEach(() => {
    location = {
      state: {
        enrolledName: '방금 회원가입한 회원',
      },
    };
  });

  context('회원가입 페이지에서', () => {
    context('홈으로 버튼을 누르면', () => {
      it('홈 화면으로 navigate', () => {
        renderWelcomePage();

        fireEvent.click(screen.getByText('홈으로'));
        expect(navigate).toBeCalledWith('/', {
          state: {
            previousPath: '/',
          },
        });
      });
    });

    context('운동 모집하기 버튼을 누르면', () => {
      it('게시글 작성 화면으로 navigate', () => {
        renderWelcomePage();

        fireEvent.click(screen.getByText('운동 모집하기'));
        expect(navigate).toBeCalledWith('/write', {
          state: {
            previousPath: '/',
          },
        });
      });
    });
  });
});
