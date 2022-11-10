import { render } from '@testing-library/react';
import context from 'jest-plugin-context';
import { MemoryRouter } from 'react-router-dom';
import PostsPage from './PostsPage';

let posts;
let images;
let games;
let places;
let roles;
const fetchPosts = jest.fn();
const fetchImages = jest.fn();
const fetchGames = jest.fn();
const fetchPlaces = jest.fn();
const fetchRoles = jest.fn();

jest.mock('../hooks/usePostStore', () => () => ({
  posts,
  images,
  games,
  places,
  roles,
  fetchPosts,
  fetchImages,
  fetchGames,
  fetchPlaces,
  fetchRoles,
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
    images = [];
    games = [];
    places = [];
    roles = [];

    it('운동 모집 게시글 상태를 가져오기 위한 fetchPost 수행', () => {
      renderPostsPage();

      expect(fetchPosts).toBeCalled();
      expect(fetchImages).toBeCalled();
      expect(fetchGames).toBeCalled();
      expect(fetchPlaces).toBeCalled();
      expect(fetchRoles).toBeCalled();
    });
  });
});
