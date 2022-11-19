import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import context from 'jest-plugin-context';
import PostsPage from './PostsPage';

const navigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => (
    navigate
  ),
}));

let posts;
let postsErrorMessage;
const fetchPosts = jest.fn();
jest.mock('../hooks/usePostStore', () => () => ({
  posts,
  postsErrorMessage,
  fetchPosts,
}));

let registeredGameId;
let registerErrorCodeAndMessage;
let registerToGame;
let cancelParticipateGame;
jest.mock('../hooks/useRegisterStore', () => () => ({
  registeredGameId,
  registerErrorCodeAndMessage,
  registerToGame,
  cancelParticipateGame,
}));

describe('PostsPage', () => {
  function renderPostsPage() {
    render((
      <PostsPage />
    ));
  }

  context('운동 모집 게시글 상세 조회 페이지가 호출되면', () => {
    posts = [
      {
        id: 1,
        hits: 100,
        game: {
          id: 22,
          type: '축구',
          date: '2022년 12월 19일 08:00~11:00',
          place: '상암월드컵경기장',
          currentMemberCount: 23,
          targetMemberCount: 26,
          isRegistered: false,
        },
      },
      {
        id: 2,
        hits: 5000,
        game: {
          id: 48,
          type: '야구',
          date: '2022년 10월 17일 13:00~17:00',
          place: '문학야구장',
          currentMemberCount: 17,
          targetMemberCount: 30,
          isRegistered: true,
        },
      },
    ];
    registerErrorCodeAndMessage = {};
    postsErrorMessage = '';
    it('운동 모집 게시글 상태를 가져오기 위한 fetchPost 수행', async () => {
      renderPostsPage();

      await waitFor(() => {
        expect(fetchPosts).toBeCalled();
      });
    });

    context('운동 모집 게시글 리스트 중 하나의 내용을 클릭하면', () => {
      it('운동 게시글 상세 보기로 이동하는 navigate 함수 호출', () => {
        jest.clearAllMocks();

        renderPostsPage();

        fireEvent.click(screen.getByText('문학야구장'));
        expect(navigate).toBeCalledWith('/posts/2', {
          state: {
            postId: 2,
          },
        });
      });
    });

    context('운동 신청 버튼을 누르면', () => {
      const expectedGameId = 22;
      registeredGameId = expectedGameId;

      it('운동 신청을 위한 registerToGame 호출 후'
        + '운동 모집 게시글 상태 최신화를 위해 fetchPosts 다시 호출', async () => {
        jest.clearAllMocks();
        registerToGame = jest.fn(() => registeredGameId);

        renderPostsPage();

        fireEvent.click(screen.getByText('신청'));
        await waitFor(() => {
          expect(registerToGame).toBeCalledWith(expectedGameId);
          expect(registerToGame).toReturnWith(registeredGameId);
          expect(fetchPosts).toBeCalledTimes(2);
        });
      });
    });

    context('운동 참가 취소 버튼을 누르면', () => {
      const expectedGameId = 48;

      it('운동 참가 취소를 위한 cancelParticipateGame 호출 후'
        + '운동 모집 게시글 상태 최신화를 위해 fetchPosts 다시 호출', async () => {
        jest.clearAllMocks();
        cancelParticipateGame = jest.fn();

        renderPostsPage();

        fireEvent.click(screen.getByText('신청취소'));
        await waitFor(() => {
          expect(cancelParticipateGame).toBeCalledWith(expectedGameId);
          expect(fetchPosts).toBeCalledTimes(2);
        });
      });
    });
  });
});
