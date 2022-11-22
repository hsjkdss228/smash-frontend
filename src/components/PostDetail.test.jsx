import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostDetail from './PostDetail';

describe('PostDetail', () => {
  const renderPostDetail = ({
    detail,
  }) => {
    render((
      <PostDetail
        detail={detail}
      />
    ));
  };

  context('게시글 상세 정보가 전달된 경우', () => {
    const detail = '사용자 1이 쓴 운동 모집 게시글의 내용입니다.';

    it('게시글 상세 정보를 출력', () => {
      renderPostDetail({
        detail,
      });

      screen.getByText('사용자 1이 쓴 운동 모집 게시글의 내용입니다.');
    });
  });
});
