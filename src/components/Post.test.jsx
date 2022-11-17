import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import Post from './Post';

describe('Post', () => {
  const renderPost = ({
    post,
    game,
    members,
  }) => {
    render((
      <Post
        post={post}
        game={game}
        members={members}
      />
    ));
  };

  context('게시글 정보가 아직 전달되지 않은 경우', () => {
    const post = {};
    const game = {};
    const members = [];

    it('게시글 정보를 불러오고 있다는 메세지 출력', () => {
      renderPost({
        post,
        game,
        members,
      });

      screen.getByText('정보를 불러오고 있습니다...');
    });
  });
});
