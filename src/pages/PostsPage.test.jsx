import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import ReactModal from 'react-modal';
import PostsPage from './PostsPage';

let location;
const navigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useLocation: () => (
    location
  ),
  useNavigate: () => (
    navigate
  ),
}));

let posts;
let postsServerError;
const resetSearchConditionState = jest.fn();
const resetLookUpConditionState = jest.fn();
const fetchPosts = jest.fn();
jest.mock('../hooks/usePostStore', () => () => ({
  posts,
  postsServerError,
  resetSearchConditionState,
  resetLookUpConditionState,
  fetchPosts,
}));

describe('PostsPage', () => {
  function renderPostsPage() {
    render((
      <PostsPage />
    ));
  }

  beforeEach(() => {
    posts = [
      {
        id: 1,
        hits: 123,
        thumbnailImageUrl: 'imageUrl',
        isAuthor: false,
        game: {
          id: 1,
          type: '운동 종목 1',
          date: '2022년 12월 22일 오전 08:00 ~ 오전 10:00',
          currentMemberCount: 3,
          targetMemberCount: 6,
          registerId: null,
          registerStatus: 'none',
        },
        place: {
          name: '운동 장소 1',
        },
      },
      {
        id: 2,
        hits: 456,
        thumbnailImageUrl: 'imageUrl',
        isAuthor: false,
        game: {
          id: 2,
          type: '운동 종목 2',
          date: '2022년 12월 23일 오후 04:00 ~ 오후 08:00',
          currentMemberCount: 9,
          targetMemberCount: 12,
          registerId: 4,
          registerStatus: 'processing',
        },
        place: {
          name: '운동 장소 2',
        },
      },
    ];
  });

  context('게시글 목록 페이지에', () => {
    beforeEach(() => {
      ReactModal.setAppElement('*');
    });

    context('게시글 작성을 완료하여 접속하는 경우', () => {
      beforeEach(() => {
        location = {
          state: {
            postStatus: 'created',
          },
        };
      });

      it('게시글 작성을 완료했음을 알리는 Modal을 출력', () => {
        renderPostsPage();

        screen.getByText('게시글 작성이 완료되었습니다.');
        fireEvent.click(screen.getByText('확인'));
        expect(screen.queryByText('게시글 작성이 완료되었습니다.')).toBe(null);
      });
    });

    context('게시글 삭제를 완료하여 접속하는 경우', () => {
      beforeEach(() => {
        location = {
          state: {
            postStatus: 'deleted',
          },
        };
      });

      it('게시글 삭제를 완료했음을 알리는 Modal을 출력', () => {
        renderPostsPage();

        screen.getByText('게시글 삭제가 완료되었습니다.');
        fireEvent.click(screen.getByText('확인'));
        expect(screen.queryByText('게시글 작성이 완료되었습니다.')).toBe(null);
      });
    });

    context('접속해서 특정 게시글 썸네일을 클릭하는 경우', () => {
      it('해당 게시글의 상세 정보 보기 페이지로 navigate', () => {
        renderPostsPage();

        fireEvent.click(screen.getByText('운동 종목 2'));
        expect(navigate).toBeCalledWith(`/posts/${posts[1].id}`, {
          state: {
            postId: posts[1].id,
          },
        });
      });
    });
  });
});
