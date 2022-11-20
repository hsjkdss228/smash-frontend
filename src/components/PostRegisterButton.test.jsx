import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostRegisterButton from './PostRegisterButton';

describe('PostRegisterButton', () => {
  const onClickRegister = jest.fn();
  const onClickRegisterCancel = jest.fn();
  const onClickParticipateCancel = jest.fn();

  const renderPostRegisterButton = ({ registerStatus }) => {
    render((
      <PostRegisterButton
        registerStatus={registerStatus}
        onClickRegister={onClickRegister}
        onClickRegisterCancel={onClickRegisterCancel}
        onClickParticipateCancel={onClickParticipateCancel}
      />
    ));
  };

  context('사용자가 게시글의 게임에 참가 신청을 하지 않았거나, 취소했거나, 거절당했었을 경우', () => {
    const registerStatus = 'none';

    it('신청 버튼 출력', () => {
      renderPostRegisterButton({ registerStatus });

      screen.getByText('신청');
    });

    context('신청 버튼을 클릭하면', () => {
      it('운동 참가 신청 핸들러 함수 호출', () => {
        renderPostRegisterButton({ registerStatus });

        fireEvent.click(screen.getByText('신청'));
        expect(onClickRegister).toBeCalled();
      });
    });
  });

  context('사용자가 게시글의 게임에 참가 신청을 한 상태인 경우', () => {
    const registerStatus = 'processing';

    it('신청취소 버튼 출력', () => {
      renderPostRegisterButton({ registerStatus });

      screen.getByText('신청취소');
    });

    context('신청취소 버튼을 클릭하면', () => {
      it('운동 참가 신청 취소 핸들러 함수 호출', () => {
        renderPostRegisterButton({ registerStatus });

        fireEvent.click(screen.getByText('신청취소'));
        expect(onClickRegisterCancel).toBeCalled();
      });
    });
  });

  context('사용자가 게시글의 게임에 참가하는 상태인 경우', () => {
    const registerStatus = 'accepted';

    it('참가취소 버튼 출력', () => {
      renderPostRegisterButton({ registerStatus });

      screen.getByText('참가취소');
    });

    context('참가취소 버튼을 클릭하면', () => {
      it('운동 참가 취소 핸들러 함수 호출', () => {
        renderPostRegisterButton({ registerStatus });

        fireEvent.click(screen.getByText('참가취소'));
        expect(onClickParticipateCancel).toBeCalled();
      });
    });
  });
});
