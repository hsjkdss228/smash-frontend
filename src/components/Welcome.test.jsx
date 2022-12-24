import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import Welcome from './Welcome';

describe('Welcome', () => {
  const navigate = jest.fn();

  function renderWelcome({
    name,
  }) {
    render((
      <Welcome
        name={name}
        navigate={navigate}
      />
    ));
  }

  const name = '황인우';

  context('회원가입 완료 페이지는', () => {
    it('사용자 환영 안내 메시지, 각 기능 화면으로 이동 링크로 구성', () => {
      renderWelcome({
        name,
      });

      screen.getByText('황인우');
      screen.getByText('님, 반갑습니다.');
    });

    context('각 기능으로 이동하는 버튼을 누르면', () => {
      it('해당 기능으로 이동하는 navigate 함수 호출', () => {
        renderWelcome({
          name,
        });

        fireEvent.click(screen.getByText('홈으로'));
        expect(navigate).toBeCalledWith('/');
        fireEvent.click(screen.getByText('운동 모집하기'));
        expect(navigate).toBeCalledWith('/write');
      });
    });
  });
});
