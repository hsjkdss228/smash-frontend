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

  context('운동 모집 게시글 조회 페이지가 호출되면', () => {
    posts = [];

    it('운동 모집 게시글 출력을 위한 fetchPosts 수행', () => {
      renderPostsPage();

      expect(fetchPosts).toBeCalled();
    });
  });
});
