import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import context from 'jest-plugin-context';
import ReactModal from 'react-modal';
import PostAuthorMenu from './PostAuthorMenu';

let post;
const deletePost = jest.fn();
jest.mock('../hooks/usePostStore', () => () => ({
  post,
  deletePost,
}));

describe('PostAuthorMenu', () => {
  const navigatePostsAfterDeleted = jest.fn();

  function renderPostAuthorMenu() {
    render((
      <PostAuthorMenu
        navigatePostsAfterDeleted={navigatePostsAfterDeleted}
      />
    ));
  }

  context('게시글 상세 정보 상단 작성자 메뉴 컴포넌트는', () => {
    it('게시글 수정, 게시글 삭제 버튼으로 구성됨', () => {
      renderPostAuthorMenu();

      screen.getByText('수정하기');
      screen.getByText('삭제하기');
    });
  });

  context('게시글 삭제하기 버튼을 클릭하고 Modal에서 확인 버튼을 클릭하면', () => {
    const targetPostId = 1;
    beforeEach(() => {
      ReactModal.setAppElement('*');
      post = {
        id: targetPostId,
      };
    });

    it('게시글 삭제 함수 호출 후 게시글 목록 화면으로 이동하는 navigate 핸들러 함수 호출', async () => {
      renderPostAuthorMenu();

      fireEvent.click(screen.getByText('삭제하기'));
      screen.getByText('정말로 게시글을 삭제하시겠습니까?');
      fireEvent.click(screen.getByText('예'));

      await waitFor(() => {
        expect(deletePost).toBeCalledWith(targetPostId);
        expect(navigatePostsAfterDeleted).toBeCalled();
      });
    });
  });
});
