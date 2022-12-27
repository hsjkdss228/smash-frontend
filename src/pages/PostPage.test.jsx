import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import context from 'jest-plugin-context';
import ReactModal from 'react-modal';
import PostPage from './PostPage';

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

let post;
const fetchPost = jest.fn();
const deletePost = jest.fn();
jest.mock('../hooks/usePostStore', () => () => ({
  post,
  fetchPost,
  deletePost,
}));
let game;
const gameId = 1;
const fetchGame = jest.fn(() => gameId);
jest.mock('../hooks/useGameStore', () => () => ({
  game,
  fetchGame,
}));
const fetchPlace = jest.fn();
jest.mock('../hooks/usePlaceStore', () => () => ({
  fetchPlace,
}));
const fetchMembers = jest.fn();
const fetchApplicants = jest.fn();
jest.mock('../hooks/useRegisterStore', () => () => ({
  fetchMembers,
  fetchApplicants,
}));

jest.mock('../components/PostGame', () => jest.fn());
jest.mock('../components/PostContent', () => jest.fn());
jest.mock('../components/PostPlace', () => jest.fn());
jest.mock('../components/PostGameMembers', () => jest.fn());
jest.mock('../components/PostGameApplicants', () => jest.fn());

describe('PostPage', () => {
  function renderPostPage() {
    render((
      <PostPage />
    ));
  }

  const pathname = '/posts/1';

  beforeEach(() => {
    location = {
      pathname,
      state: {
        postId: 1,
      },
    };
    post = {
      isAuthor: false,
    };
    game = {
      placeId: 1,
    };
  });

  context('게시글 상세 정보 페이지에', () => {
    context('접속해서 뒤로가기 버튼을 누를 경우', () => {
      it('게시글 목록 페이지로 이동하는 navigate 함수 호출', () => {
        renderPostPage();

        fireEvent.click(screen.getByText('뒤로가기'));
        expect(navigate).toBeCalledWith('/posts/list');
      });
    });

    context('로그인하지 않은 상태로 접속해', () => {
      beforeEach(() => {
        localStorage.setItem('accessToken', JSON.stringify(''));
      });

      // TODO: 체험 계정 선택하기는 체험 계정 선택하기 페이지로 이동해야 함
      context('로그인하기/체험 계정 선택하기 버튼을 눌렀을 경우', () => {
        it('로그인 화면으로 이동하는 navigate 함수 호출, 현재 경로를 state로 같이 전달', () => {
          renderPostPage();

          fireEvent.click(screen.getByText('로그인하기'));
          expect(navigate).toBeCalledWith('/login', {
            state: {
              previousPath: pathname,
            },
          });
          fireEvent.click(screen.getByText('체험 계정 선택하기'));
          expect(navigate).toBeCalledWith('/login', {
            state: {
              previousPath: pathname,
            },
          });
        });
      });
    });

    context('게시글 작성자가 로그인한 상태로 접속해', () => {
      beforeEach(() => {
        ReactModal.setAppElement('*');
        localStorage.setItem('accessToken', JSON.stringify('TOKEN'));
        post = {
          isAuthor: true,
        };
      });

      context('게시글 삭제 버튼을 누르고, 동작 수행 재확인 Modal에서 예 버튼을 눌렀을 경우', () => {
        it('게시글 목록 화면으로 이동하는 navigate 함수 호출, '
          + '게시글을 삭제했음을 알리는 상태를 state로 같이 전달', async () => {
          renderPostPage();

          fireEvent.click(screen.getByText('삭제하기'));
          screen.getByText('정말로 게시글을 삭제하시겠습니까?');
          fireEvent.click(screen.getByText('예'));
          await waitFor(() => {
            expect(navigate).toBeCalledWith('/posts/list', {
              state: {
                postStatus: 'deleted',
              },
            });
          });
        });
      });
    });
  });
});
