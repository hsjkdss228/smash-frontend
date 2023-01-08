import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import ReactModal from 'react-modal';
import ModalLoginGuide from './ModalLoginGuide';

describe('ModalLoginGuide', () => {
  ReactModal.setAppElement('*');
  const setLoginGuideModalState = jest.fn();
  const onClickLogin = jest.fn();
  const onClickSelectTrialAccount = jest.fn();

  function renderModalLoginGuide({
    loginGuideModalState,
  }) {
    render((
      <ModalLoginGuide
        loginGuideModalState={loginGuideModalState}
        setLoginGuideModalState={setLoginGuideModalState}
        onClickLogin={onClickLogin}
        onClickSelectTrialAccount={onClickSelectTrialAccount}
      />
    ));
  }

  context('Modal이 활성화되면', () => {
    const loginGuideModalState = true;

    it('로그인이 필요하다는 메시지와 로그인/체험용 계정 선택 버튼을 출력', () => {
      renderModalLoginGuide({
        loginGuideModalState,
      });

      screen.getByText('로그인이 필요합니다.');
      screen.getByText('로그인');
      screen.getByText('체험용 계정 선택');
    });

    context('로그인 버튼을 누르면', () => {
      it('로그인 화면으로 이동하는 핸들러 함수 호출', () => {
        renderModalLoginGuide({
          loginGuideModalState,
        });

        fireEvent.click(screen.getByText('로그인'));
        expect(onClickLogin).toBeCalled();
      });
    });

    context('체험용 계정 선택 버튼을 누르면', () => {
      it('체험용 계정 선택 화면으로 이동하는 핸들러 함수 호출', () => {
        renderModalLoginGuide({
          loginGuideModalState,
        });

        fireEvent.click(screen.getByText('체험용 계정 선택'));
        expect(onClickSelectTrialAccount).toBeCalled();
      });
    });
  });

  context('Modal이 비활성화 상태라면', () => {
    const loginGuideModalState = false;

    it('출력되지 않음', () => {
      renderModalLoginGuide({
        loginGuideModalState,
      });

      expect(screen.queryByText('로그인이 필요합니다.')).toBe(null);
    });
  });
});
