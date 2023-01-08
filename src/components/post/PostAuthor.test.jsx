import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostAuthor from './PostAuthor';

let post;
jest.mock('../hooks/usePostStore', () => () => ({
  post,
}));

describe('PostAuthor', () => {
  function renderPostAuthor() {
    render((
      <PostAuthor />
    ));
  }

  context('게시글 상세 정보 보기 작성자 정보 컴포넌트는', () => {
    beforeEach(() => {
      post = {
        authorInformation: {
          profileImageUrl: 'Image Url',
          name: '작성자',
          phoneNumber: '010-0123-4567',
          mannerScore: 9.5,
        },
      };
    });

    it('작성자 프로필 사진, 작성자 이름, 작성자 연락처, 작성자 매너 점수, 프로필 확인 버튼으로 구성됨', () => {
      renderPostAuthor();

      screen.getByAltText('사용자 프로필 이미지');
      screen.getByText('작성자');
      screen.getByText('010-0123-4567');
      screen.getByText('평점: 9.5');
      screen.getByText('프로필 확인하기');
    });
  });

  // TODO: 프로필 확인하기 버튼 클릭 시 프로필 확인 Modal 출력 기능 추가 필요
});
