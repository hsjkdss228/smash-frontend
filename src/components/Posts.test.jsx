import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import Posts from './Posts';

describe('Posts', () => {
  const navigateToBackward = jest.fn();
  const navigateToPost = jest.fn();
  const registerToGame = jest.fn();
  const cancelRegisterGame = jest.fn();

  const renderPosts = ({
    posts,
    postsErrorMessage,
    registerErrorCodeAndMessage,
  }) => {
    render((
      <Posts
        navigateToBackward={navigateToBackward}
        posts={posts}
        navigateToPost={navigateToPost}
        postsErrorMessage={postsErrorMessage}
        registerErrorCodeAndMessage={registerErrorCodeAndMessage}
        registerToGame={registerToGame}
        cancelRegisterGame={cancelRegisterGame}
      />
    ));
  };

  context('등록된 게시글이 존재하지 않는 경우', () => {
    const posts = [];
    const postsErrorMessage = '';
    const registerErrorCodeAndMessage = '';

    it('게시물 미존재 안내 메세지 출력', () => {
      renderPosts({
        posts,
        postsErrorMessage,
        registerErrorCodeAndMessage,
      });

      screen.getByText(/등록된 게시물이 존재하지 않습니다./);
    });
  });

  context('게임이 찾아지지 않은 에러가 발생한 경우', () => {
    const posts = [];
    const postsErrorMessage = '주어진 게임 번호에 해당하는 게임을 찾을 수 없습니다.';
    const registerErrorCodeAndMessage = '';

    it('에러 메세지 출력', () => {
      renderPosts({
        posts,
        postsErrorMessage,
        registerErrorCodeAndMessage,
      });

      screen.getByText(/주어진 게임 번호에 해당하는 게임을 찾을 수 없습니다./);
    });
  });

  context('등록된 게시물이 있을 경우', () => {
    const posts = [
      {
        id: 1,
        hits: 334,
        game: {
          type: '배드민턴',
          date: '2022년 10월 24일 13:00~16:00',
          place: '올림픽공원 핸드볼경기장',
          currentMemberCount: 4,
          targetMemberCount: 5,
          isRegistered: false,
        },
      },
    ];
    const postsErrorMessage = '';
    const registerErrorCodeAndMessage = '';

    it('뒤로가기 버튼을 누를 시 뒤로가기로 이동하는 navigate 함수 호출', () => {
      renderPosts({
        posts,
        postsErrorMessage,
        registerErrorCodeAndMessage,
      });

      fireEvent.click(screen.getByText('⬅️'));
      expect(navigateToBackward).toBeCalled();
    });

    it('게시물 내용 클릭 시 해당 게시물 상세 정보 보기로 이동하는 navigate 함수 호출', () => {
      renderPosts({
        posts,
        postsErrorMessage,
        registerErrorCodeAndMessage,
      });

      fireEvent.click(screen.getByText('배드민턴'));
      const expectedPostId = 1;
      expect(navigateToPost).toBeCalledWith(expectedPostId);
    });
  });
});
