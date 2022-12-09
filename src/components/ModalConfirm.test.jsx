import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import ModalConfirm from './ModalConfirm';

describe('ModalConfirm', () => {
  const setConfirmModalState = jest.fn();

  function renderModalConfirm({
    actionMessage,
    confirmModalState,
  }) {
    render((
      <ModalConfirm
        actionMessage={actionMessage}
        confirmModalState={confirmModalState}
        setConfirmModalState={setConfirmModalState}
      />
    ));
  }

  context('Modal이 활성화되면', () => {
    const actionMessage = '어떤 동작이';
    const confirmModalState = true;

    it('전달받은 메시지를 출력', () => {
      renderModalConfirm({
        actionMessage,
        confirmModalState,
      });

      screen.getByText('어떤 동작이 완료되었습니다.');
      screen.getByText('확인');
    });

    context('확인 버튼을 누르면', () => {
      it('Modal을 비활성화시키는 핸들러 함수를 호출', () => {
        renderModalConfirm({
          actionMessage,
          confirmModalState,
        });

        fireEvent.click(screen.getByText('확인'));
        expect(setConfirmModalState).toBeCalledWith(false);
      });
    });
  });

  context('Modal이 비활성화 상태라면', () => {
    const actionMessage = '어떤 동작이';
    const confirmModalState = false;

    it('출력되지 않음', () => {
      renderModalConfirm({
        actionMessage,
        confirmModalState,
      });

      expect(screen.queryByText('어떤 동작이 완료되었습니다.')).toBe(null);
    });
  });
});
