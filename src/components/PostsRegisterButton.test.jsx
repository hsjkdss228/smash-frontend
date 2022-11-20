import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostsRegisterButton from './PostsRegisterButton';

describe('PostsRegisterButton', () => {
  const registerToGame = jest.fn();
  const cancelRegisterToGame = jest.fn();
  const cancelParticipateToGame = jest.fn();

  const renderPostsRegisterButton = ({
    gameId,
    registerId,
    registerStatus,
  }) => {
    render((
      <PostsRegisterButton
        gameId={gameId}
        registerId={registerId}
        registerStatus={registerStatus}
        registerToGame={registerToGame}
        cancelRegisterToGame={cancelRegisterToGame}
        cancelParticipateToGame={cancelParticipateToGame}
      />
    ));
  };

  context('신청 버튼이 있으면 신청 버튼 클릭 시', () => {
    const gameId = 2;
    const registerId = -1;
    const registerStatus = 'none';

    it('운동 참가 신청 이벤트 핸들러 호출', () => {
      jest.clearAllMocks();
      renderPostsRegisterButton({
        gameId,
        registerId,
        registerStatus,
      });

      fireEvent.click(screen.getByText('신청'));
      expect(registerToGame).toBeCalledWith(gameId);
    });
  });

  context('신청 취소 버튼이 있으면 신청 취소 버튼 클릭 시', () => {
    const gameId = 2;
    const registerId = 7;
    const registerStatus = 'processing';

    it('운동 참가 취소 이벤트 핸들러 호출', () => {
      jest.clearAllMocks();
      renderPostsRegisterButton({
        gameId,
        registerId,
        registerStatus,
      });

      fireEvent.click(screen.getByText('신청취소'));
      expect(cancelRegisterToGame).toBeCalledWith(registerId);
    });
  });

  context('참가 취소 버튼이 있으면 참가 취소 버튼 클릭 시', () => {
    const gameId = 2;
    const registerId = 7;
    const registerStatus = 'accepted';

    it('에러 메세지 출력', () => {
      renderPostsRegisterButton({
        gameId,
        registerId,
        registerStatus,
      });

      fireEvent.click(screen.getByText('참가취소'));
      expect(cancelParticipateToGame).toBeCalledWith(registerId);
    });
  });
});
