import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostDetail from './PostDetail';

let post;
jest.mock('../hooks/usePostStore', () => () => ({
  post,
}));

describe('PostDetail', () => {
  function renderPostDetail() {
    render((
      <PostDetail />
    ));
  }

  context('게시글 상세 정보 중 상세 글 내용 컴포넌트는', () => {
    beforeEach(() => {
      post = {
        detail: '작성자가 직접 입력한 상제 글 내용',
      };
    });

    it('작성자가 입력한 글 내용으로 구성됨', () => {
      renderPostDetail();

      screen.getByText('작성자가 직접 입력한 상제 글 내용');
    });
  });
});
