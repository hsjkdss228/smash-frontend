import { render } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostListPage from './PostListPage';

let posts;
const fetchPosts = jest.fn();

jest.mock('../hooks/usePostStore', () => () => ({
  posts,
  fetchPosts,
}));

describe('PostsListPage', () => {
  function renderPostsPage() {
    render((
      <PostListPage />
    ));
  }

  context('운동 모집 게시글 조회 페이지가 호출되면', () => {
    posts = [];

    it('운동 모집 게시글 리스트 상태를 가져오기 위한 fetchPosts 수행', () => {
      renderPostsPage();

      expect(fetchPosts).toBeCalled();
    });
  });
});
