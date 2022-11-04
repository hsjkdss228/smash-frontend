import { render } from '@testing-library/react';
import context from 'jest-plugin-context';
import { MemoryRouter } from 'react-router-dom';
import PostPage from './PostPage';

let information;
let teamsAndPositions;
const fetchPost = jest.fn();

jest.mock('../hooks/usePostStore', () => () => ({
  information,
  teamsAndPositions,
  fetchPost,
}));

describe('PostPage', () => {
  function renderPostPage() {
    render((
      <MemoryRouter>
        <PostPage />
      </MemoryRouter>
    ));
  }

  context('운동 모집 게시글 상세 조회 페이지가 호출되면', () => {
    information = [];
    teamsAndPositions = [];

    it('운동 모집 게시글 상태를 가져오기 위한 fetchPost 수행', () => {
      renderPostPage();

      expect(fetchPost).toBeCalled();
    });
  });
});
