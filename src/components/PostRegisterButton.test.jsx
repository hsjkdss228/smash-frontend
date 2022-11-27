import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostRegisterButton from './PostRegisterButton';

describe('PostRegisterButton', () => {
  const onClickRegister = jest.fn();
  const onClickRegisterCancel = jest.fn();
  const onClickParticipateCancel = jest.fn();

  const renderPostRegisterButton = ({
    currentMemberCount,
    targetMemberCount,
    registerStatus,
    registerError,
  }) => {
    render((
      <PostRegisterButton
        currentMemberCount={currentMemberCount}
        targetMemberCount={targetMemberCount}
        registerStatus={registerStatus}
        onClickRegister={onClickRegister}
        onClickRegisterCancel={onClickRegisterCancel}
        onClickParticipateCancel={onClickParticipateCancel}
        registerError={registerError}
      />
    ));
  };

  context('사용자가 게시글의 게임에 참가 신청을 하지 않았거나, 취소했거나, 거절당했었을 경우', () => {
    const currentMemberCount = 4;
    const targetMemberCount = 6;
    const registerStatus = 'none';
    const registerError = {};

    it('신청 버튼 출력', () => {
      renderPostRegisterButton({
        currentMemberCount,
        targetMemberCount,
        registerStatus,
        registerError,
      });

      screen.getByText('신청');
    });

    context('신청 버튼을 클릭하면', () => {
      it('운동 참가 신청 핸들러 함수 호출', () => {
        renderPostRegisterButton({
          currentMemberCount,
          targetMemberCount,
          registerStatus,
          registerError,
        });

        fireEvent.click(screen.getByText('신청'));
        expect(onClickRegister).toBeCalled();
      });
    });
  });

  context('사용자가 게시글의 게임에 참가 신청을 한 상태인 경우', () => {
    const currentMemberCount = 4;
    const targetMemberCount = 6;
    const registerStatus = 'processing';
    const registerError = {};

    it('신청취소 버튼 출력', () => {
      renderPostRegisterButton({
        currentMemberCount,
        targetMemberCount,
        registerStatus,
        registerError,
      });

      screen.getByText('신청취소');
    });

    context('신청취소 버튼을 클릭하면', () => {
      it('운동 참가 신청 취소 핸들러 함수 호출', () => {
        renderPostRegisterButton({
          currentMemberCount,
          targetMemberCount,
          registerStatus,
          registerError,
        });

        fireEvent.click(screen.getByText('신청취소'));
        expect(onClickRegisterCancel).toBeCalled();
      });
    });
  });

  context('사용자가 게시글의 게임에 참가하는 상태인 경우', () => {
    const currentMemberCount = 4;
    const targetMemberCount = 6;
    const registerStatus = 'accepted';
    const registerError = {};

    it('참가취소 버튼 출력', () => {
      renderPostRegisterButton({
        currentMemberCount,
        targetMemberCount,
        registerStatus,
        registerError,
      });

      screen.getByText('참가취소');
    });

    context('참가취소 버튼을 클릭하면', () => {
      it('운동 참가 취소 핸들러 함수 호출', () => {
        renderPostRegisterButton({
          currentMemberCount,
          targetMemberCount,
          registerStatus,
          registerError,
        });

        fireEvent.click(screen.getByText('참가취소'));
        expect(onClickParticipateCancel).toBeCalled();
      });
    });
  });

  context('게시글에 신청하지 않은 상태에서 정원이 가득 찬 상태인 경우', () => {
    const currentMemberCount = 6;
    const targetMemberCount = 6;
    const registerStatus = 'none';
    const registerError = {};

    it('버튼 대신 정원이 가득 찼다는 메시지 출력', () => {
      renderPostRegisterButton({
        currentMemberCount,
        targetMemberCount,
        registerStatus,
        registerError,
      });

      screen.getByText('참가 정원이 모두 찼습니다.');
    });
  });

  context('정원이 가득 찼다는 에러 메세지가 전달되었을 경우', () => {
    const currentMemberCount = 5;
    const targetMemberCount = 6;
    const registerStatus = 'none';
    const registerError = {
      errorCode: 100,
      errorMessage: '참가 정원이 모두 차 참가를 신청할 수 없습니다.',
    };

    it('버튼 아래에 에러 메세지를 출력', () => {
      renderPostRegisterButton({
        currentMemberCount,
        targetMemberCount,
        registerStatus,
        registerError,
      });

      screen.getByText('신청');
      screen.getByText('참가 정원이 모두 차 참가를 신청할 수 없습니다.');
    });
  });
});
