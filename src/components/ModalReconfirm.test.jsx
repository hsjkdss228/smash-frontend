import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import context from 'jest-plugin-context';
import ReactModal from 'react-modal';
import ModalReconfirm from './ModalReconfirm';

describe('ModalReconfirm', () => {
  ReactModal.setAppElement('*');
  const action = jest.fn();
  const setReconfirmModalState = jest.fn();

  function renderModalReconfirm({
    actionMessage,
    reconfirmModalState,
  }) {
    render((
      <ModalReconfirm
        action={action}
        actionMessage={actionMessage}
        reconfirmModalState={reconfirmModalState}
        setReconfirmModalState={setReconfirmModalState}
      />
    ));
  }

  context('Modal이 활성화되면', () => {
    const actionMessage = '어떤 동작을 ';
    const reconfirmModalState = true;

    it('전달받은 메시지를 출력', () => {
      renderModalReconfirm({
        actionMessage,
        reconfirmModalState,
      });

      screen.getByText('정말로 어떤 동작을 하시겠습니까?');
      screen.getByText('예');
      screen.getByText('아니오');
    });

    context('예 버튼을 누르면', () => {
      it('동작을 수행한 뒤, Modal을 비활성화시키는 핸들러 함수를 호출', async () => {
        renderModalReconfirm({
          actionMessage,
          reconfirmModalState,
        });

        fireEvent.click(screen.getByText('예'));
        await waitFor(() => {
          expect(action).toBeCalled();
          expect(setReconfirmModalState).toBeCalledWith(false);
        });
      });
    });

    context('아니오 버튼을 누르면', () => {
      it('Modal을 비활성화시키는 핸들러 함수를 호출', async () => {
        renderModalReconfirm({
          actionMessage,
          reconfirmModalState,
        });

        fireEvent.click(screen.getByText('아니오'));
        expect(setReconfirmModalState).toBeCalledWith(false);
      });
    });
  });

  context('Modal이 비활성화 상태라면', () => {
    const actionMessage = '어떤 동작을';
    const reconfirmModalState = false;

    it('출력되지 않음', () => {
      renderModalReconfirm({
        actionMessage,
        reconfirmModalState,
      });

      expect(screen.queryByText('정말로 어떤 동작을 하시겠습니까?')).toBe(null);
    });
  });
});
