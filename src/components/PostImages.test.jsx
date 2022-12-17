import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostImages from './PostImages';

let post;
jest.mock('../hooks/usePostStore', () => () => ({
  post,
}));

describe('PostImages', () => {
  function renderPostImages() {
    return render((
      <PostImages />
    ));
  }

  context('게시글 상세 정보 중 업로드된 사진 목록 컴포넌트는', () => {
    context('업로드된 이미지 목록이 존재하는 경우', () => {
      beforeEach(() => {
        post = {
          imageUrls: [
            'image Url 1',
            'image Url 2',
            'image Url 3',
          ],
        };
      });

      it('업로드듼 이미지 사진들로 구성됨', () => {
        renderPostImages();

        screen.getByAltText('등록된 이미지 1');
        screen.getByAltText('등록된 이미지 2');
        screen.getByAltText('등록된 이미지 3');
      });
    });

    context('업로드된 이미지 목록이 존재하지 않는 경우', () => {
      beforeEach(() => {
        post = {
          imageUrls: [],
        };
      });

      it('컴포넌트가 출력되지 않음', () => {
        const { container } = renderPostImages();
        expect(container.childElementCount).toBe(0);
      });
    });
  });
});
