import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import Posts from './Posts';

describe('Posts', () => {
  const registerToGame = jest.fn();
  const cancelRegisterGame = jest.fn();

  const renderPosts = ({
    posts,
    postsErrorMessage,
    registerErrorCodeAndMessage,
  }) => {
    render((
      <Posts
        posts={posts}
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

    it('게시물 미존재 안내 메세지 출력', () => {
      renderPosts({ posts, postsErrorMessage });

      screen.getByText(/등록된 게시물이 존재하지 않습니다./);
    });
  });

  context('게임이 찾아지지 않은 에러가 발생한 경우', () => {
    const posts = [];
    const postsErrorMessage = '주어진 게임 번호에 해당하는 게임을 찾을 수 없습니다.';

    it('에러 메세지 출력', () => {
      renderPosts({ posts, postsErrorMessage });

      screen.getByText(/주어진 게임 번호에 해당하는 게임을 찾을 수 없습니다./);
    });
  });
});
