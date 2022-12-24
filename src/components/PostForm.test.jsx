import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import context from 'jest-plugin-context';
import ReactModal from 'react-modal';
import PostForm from './PostForm';

const clearStates = jest.fn();
let createPost;
jest.mock('../hooks/usePostFormStore', () => () => ({
  clearStates,
  createPost,
}));

jest.mock('./PostFormExerciseName', () => jest.fn());
jest.mock('./PostFormDateTimeSection', () => jest.fn());
jest.mock('./PostFormPlace', () => jest.fn());
jest.mock('./PostFormTargetMemberCount', () => jest.fn());
jest.mock('./PostFormDetail', () => jest.fn());

describe('PostForm', () => {
  ReactModal.setAppElement('*');
  const navigateBackward = jest.fn();
  const navigatePostsAfterCreated = jest.fn();

  function renderPostForm() {
    render((
      <PostForm
        navigateBackward={navigateBackward}
        navigatePostsAfterCreated={navigatePostsAfterCreated}
      />
    ));
  }

  context('게시글 작성 입력 폼은', () => {
    it('뒤로가기 버튼, 각 내용 입력 폼들, 초기화, 작성하기 버튼으로 구성됨', () => {
      renderPostForm();

      screen.getByText('뒤로가기');
      screen.getByText('초기화');
      screen.getByText('작성하기');
    });

    context('뒤로가기 버튼을 누르면', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('게시글 작성 중단 여부를 묻는 Modal 출력, 예 버튼을 누르면 '
        + '게시글 입력 폼 상태를 초기화하는 함수를 호출한 뒤 뒤로가기 핸들러 함수 호출', async () => {
        renderPostForm();

        fireEvent.click(screen.getByText('뒤로가기'));
        screen.getByText('정말로 게시글 작성을 중단하시겠습니까?');
        fireEvent.click(screen.getByText('예'));
        await waitFor(() => {
          expect(clearStates).toBeCalledTimes(2);
          expect(navigateBackward).toBeCalled();
        });
      });
    });

    context('초기화 버튼을 누르면', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('게시글 입력 폼 초기화 여부를 묻는 Modal 출력, 예 버튼을 누르면 '
        + '게시글 입력 폼 상태를 초기화하는 함수를 호출한 뒤 입력 폼 초기화 함수 호출', async () => {
        renderPostForm();

        fireEvent.click(screen.getByText('초기화'));
        screen.getByText('정말로 입력 내용을 초기화하시겠습니까?');
        fireEvent.click(screen.getByText('예'));
        await waitFor(() => {
          expect(clearStates).toBeCalledTimes(2);
        });
      });
    });
  });

  context('등록하기 버튼을 누르면 게시글 등록 함수를 호출하는데', () => {
    const expectedCreatedPostId = 222;

    context('호출 결과로 등록된 게시글 식별자가 반환되는 경우에는', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        createPost = jest.fn(() => expectedCreatedPostId);
      });

      it('게시글 입력 폼 상태를 초기화하는 함수를 호출한 뒤 '
        + '게시글 목록 화면으로 이동하는 핸들러 함수 호출', async () => {
        renderPostForm();

        fireEvent.click(screen.getByText('작성하기'));
        await waitFor(() => {
          expect(createPost).toBeCalled();
          expect(clearStates).toBeCalledTimes(2);
          expect(navigatePostsAfterCreated).toBeCalled();
        });
      });
    });

    context('오류가 발생해서 호출 결과로 빈 값이 반환되는 경우에는', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        createPost = jest.fn(() => '');
      });

      it('입력 폼 상태 초기화 함수 및 게시글 목록으로 이동 핸들러 함수를 호출하지 않음', async () => {
        renderPostForm();

        fireEvent.click(screen.getByText('작성하기'));
        await waitFor(() => {
          expect(createPost).toBeCalled();
          expect(clearStates).toBeCalledTimes(1);
          expect(navigatePostsAfterCreated).not.toBeCalled();
        });
      });
    });
  });
});
