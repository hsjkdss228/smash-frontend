import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostsRegisterButton from './PostsRegisterButton';

describe('PostsRegisterButton', () => {
  const registerToGame = jest.fn();
  const cancelRegisterGame = jest.fn();

  const renderPostsRegisterButton = ({
    gameId,
    isRegistered,
    registerErrorCodeAndMessage,
  }) => {
    render((
      <PostsRegisterButton
        gameId={gameId}
        isRegistered={isRegistered}
        registerToGame={registerToGame}
        cancelRegisterGame={cancelRegisterGame}
        registerErrorCodeAndMessage={registerErrorCodeAndMessage}
      />
    ));
  };

  context('신청 버튼이 있으면 신청 버튼 클릭 시', () => {
    const gameId = 2;
    const isRegistered = false;
    const registerErrorCodeAndMessage = {};

    it('운동 참가 신청 이벤트 핸들러 호출', () => {
      jest.clearAllMocks();
      renderPostsRegisterButton({
        gameId,
        isRegistered,
        registerErrorCodeAndMessage,
      });

      fireEvent.click(screen.getByText('신청'));
      const expectedGameId = 2;
      expect(registerToGame).toBeCalledWith(expectedGameId);
    });
  });

  context('신청 취소 버튼이 있으면 신청 취소 버튼 클릭 시', () => {
    const gameId = 1;
    const isRegistered = true;
    const registerErrorCodeAndMessage = {};

    it('운동 참가 취소 이벤트 핸들러 호출', () => {
      jest.clearAllMocks();
      renderPostsRegisterButton({
        gameId,
        isRegistered,
        registerErrorCodeAndMessage,
      });

      fireEvent.click(screen.getByText('신청취소'));
      const expectedGameId = 1;
      expect(cancelRegisterGame).toBeCalledWith(expectedGameId);
    });
  });

  context('신청 후 에러가 발생해 에러 상태가 전달되었을 시', () => {
    const gameId = 10;
    const isRegistered = false;
    const registerErrorCodeAndMessage = {
      code: 101,
      message: '이미 신청이 완료된 운동입니다.',
    };

    it('에러 메세지 출력', () => {
      renderPostsRegisterButton({
        gameId,
        isRegistered,
        registerErrorCodeAndMessage,
      });

      screen.getByText('이미 신청이 완료된 운동입니다.');
    });
  });
});
