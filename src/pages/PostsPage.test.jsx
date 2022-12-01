import {
  fireEvent, render, screen,
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

describe('PostsPage', () => {
  function renderPostsPage() {
    render((
      <PostsPage />
    ));
  }

  context('운동 모집 게시글 상세 조회 페이지가 호출되면', () => {
    beforeEach(() => {
      posts = [
        {
          id: 1,
          hits: 100,
          isAuthor: false,
          game: {
            id: 22,
            type: '축구',
            date: '2022년 12월 19일 08:00~11:00',
            place: '상암월드컵경기장',
            currentMemberCount: 23,
            targetMemberCount: 26,
            registerId: -1,
            registerStatus: 'none',
          },
        },
        {
          id: 2,
          hits: 5000,
          isAuthor: false,
          game: {
            id: 48,
            type: '야구',
            date: '2022년 10월 17일 13:00~17:00',
            place: '문학야구장',
            currentMemberCount: 17,
            targetMemberCount: 30,
            registerId: 25,
            registerStatus: 'processing',
          },
        },
        {
          id: 3,
          hits: 363,
          isAuthor: false,
          game: {
            id: 100,
            type: '골프',
            date: '2022년 10월 18일 10:00~16:00',
            place: '남양주CC',
            currentMemberCount: 2,
            targetMemberCount: 5,
            registerId: 40,
            registerStatus: 'accepted',
          },
        },
      ];
      postsErrorMessage = '';
    });

    it('운동 모집 게시글 상태를 가져오기 위한 fetchPost 수행', async () => {
      renderPostsPage();

      await expect(fetchPosts).toBeCalled();
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
  });
});
