import { render } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostsListPage from './PostsListPage';

let posts;
const fetchPosts = jest.fn();

jest.mock('../hooks/usePostStore', () => () => ({
  posts,
  fetchPosts,
}));

describe('PostsListPage', () => {
  function renderPostsPage() {
    render((
      <PostsListPage />
    ));
  }

  context('운동 모집 게시글이 존재하는 경우', () => {
    posts = [
      {
        id: 3,
        detail: '자전거 남산 업힐 5분 주파 팀원 모집합니다',
        participants: [
          { id: 1, name: '참가자 1' },
          { id: 2, name: '참가자 2' },
          { id: 3, name: '참가자 3' },
        ],
      },
      {
        id: 6,
        detail: '배드민턴 고?',
        participants: [
          { id: 1, name: '참가자 1' },
          { id: 2, name: '참가자 2' },
          { id: 3, name: '참가자 3' },
          { id: 4, name: '참가자 4' },
        ],
      },
    ];

    it('운동 모집 게시글 출력', () => {
      renderPostsPage();

      expect(fetchPosts).toBeCalled();
    });
  });
});
