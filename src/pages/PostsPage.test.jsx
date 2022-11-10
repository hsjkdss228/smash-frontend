import { render } from '@testing-library/react';
import context from 'jest-plugin-context';
import { MemoryRouter } from 'react-router-dom';
import PostsPage from './PostsPage';

let posts;
const fetchPosts = jest.fn();

jest.mock('../hooks/usePostStore', () => () => ({
  posts,
  fetchPosts,
}));

describe('PostsPage', () => {
  function renderPostsPage() {
    render((
      <MemoryRouter>
        <PostsPage />
      </MemoryRouter>
    ));
  }

  context('운동 모집 게시글 상세 조회 페이지가 호출되면', () => {
    posts = [];
    it('운동 모집 게시글 상태를 가져오기 위한 fetchPost 수행', () => {
      renderPostsPage();

      expect(fetchPosts).toBeCalled();
    });
  });
});
