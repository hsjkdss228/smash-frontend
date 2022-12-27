import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import context from 'jest-plugin-context';
import ReactModal from 'react-modal';
import PostFormPage from './PostFormPage';

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

const clearStates = jest.fn();
const resetForm = jest.fn();
const formErrors = {};
let createPost;
jest.mock('../hooks/usePostFormStore', () => () => ({
  clearStates,
  resetForm,
  formErrors,
  createPost,
}));

describe('PostFormPage', () => {
  function renderPostFormPage() {
    render((
      <PostFormPage />
    ));
  }

  context('게시글 작성 페이지에서', () => {
    context('내용 입력을 정상적으로 마친 상태에서 작성하기 버튼을 누르면', () => {
      beforeEach(() => {
        location = {
          state: null,
        };

        const expectedPostId = 99;
        createPost = jest.fn(() => expectedPostId);
      });

      // TODO: 게시글 목록 페이지가 아니라
      //   작성한 게시글의 상세 내용 페이지로 navigate되도록 수정하는 게 좋겠다.
      it('게시글 목록 페이지로 navigate', async () => {
        renderPostFormPage();

        fireEvent.click(screen.getByText('작성하기'));
        await waitFor(() => {
          expect(navigate).toBeCalledWith('/posts/list', {
            state: {
              postStatus: 'created',
            },
          });
        });
      });
    });

    context('뒤로가기 버튼을 누르고, 동작 수행 재확인 Modal에서 예 버튼을 눌렀을 경우', () => {
      beforeEach(() => {
        ReactModal.setAppElement('*');
      });

      context('이전에 접속했었던 화면의 경로가 존재할 경우', () => {
        const previousPath = '/posts/3';
        beforeEach(() => {
          location = {
            state: {
              previousPath,
            },
          };

          jest.clearAllMocks();
        });

        it('접속하기 이전의 주소로 navigate', async () => {
          renderPostFormPage();

          fireEvent.click(screen.getByText('뒤로가기'));
          screen.getByText('정말로 게시글 작성을 중단하시겠습니까?');
          fireEvent.click(screen.getByText('예'));
          await waitFor(() => {
            expect(navigate).toBeCalledWith(previousPath);
          });
        });
      });

      context('주소로 직접 접근했었을 경우', () => {
        beforeEach(() => {
          location = {
            state: null,
          };

          jest.clearAllMocks();
        });

        it('홈 화면 주소로 navigate', async () => {
          renderPostFormPage();

          fireEvent.click(screen.getByText('뒤로가기'));
          screen.getByText('정말로 게시글 작성을 중단하시겠습니까?');
          fireEvent.click(screen.getByText('예'));
          await waitFor(() => {
            expect(navigate).toBeCalledWith('/');
          });
        });
      });
    });
  });
});
