import {
  render, waitFor,
} from '@testing-library/react';
import context from 'jest-plugin-context';
import PostPage from './PostPage';

let postId;
const navigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    state: {
      postId,
    },
  }),
  useNavigate: () => (
    navigate
  ),
}));

let post;
const fetchPost = jest.fn();
jest.mock('../hooks/usePostStore', () => () => ({
  post,
  fetchPost,
}));

let game;
let fetchGame;
jest.mock('../hooks/useGameStore', () => () => ({
  game,
  fetchGame,
}));

let members;
const fetchMembers = jest.fn();
jest.mock('../hooks/useRegisterStore', () => () => ({
  members,
  fetchMembers,
}));

describe('PostPage', () => {
  function renderPostPage() {
    render((
      <PostPage />
    ));
  }

  context('운동 모집 게시글 상세 정보 페이지에 접속하면', () => {
    postId = 1;

    post = {
      id: 1,
      hits: 15,
      authorName: '작성자명',
      authorPhoneNumber: '010-6877-2291',
      detail: '게시글 상세 정보 내용입니다.',
      isAuthor: false,
    };
    game = {
      id: 1,
      type: '농구',
      date: '2022년 12월 23일 20:00~22:00',
      place: '인천삼산체육관',
      currentMemberCount: 2,
      targetMemberCount: 12,
      isRegistered: true,
    };
    members = [
      {
        id: 1,
        name: '사용자 1',
        gender: '남성',
        phoneNumber: '010-1234-5678',
      },
      {
        id: 2,
        name: '사용자 2',
        gender: '남성',
        phoneNumber: '010-8765-4321',
      },
    ];

    it('운동 모집 게시글 상세 정보 상태들을 PostStore, '
      + 'GameStore, MemberStore에서 순차적으로 fetch', async () => {
      jest.clearAllMocks();
      const expectedPostId = 1;
      const expectedGameId = 1;
      fetchGame = jest.fn(() => expectedGameId);

      renderPostPage();

      await waitFor(() => {
        expect(fetchPost).toBeCalledWith(expectedPostId);
        expect(fetchGame).toBeCalledWith(expectedPostId);
        expect(fetchGame).toReturnWith(expectedGameId);
        expect(fetchMembers).toBeCalledWith(expectedGameId);
      });
    });
  });
});
