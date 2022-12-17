import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostPlace from './PostPlace';

let place;
jest.mock('../hooks/usePlaceStore', () => () => ({
  place,
}));

describe('PostPlace', () => {
  function renderPostPlace() {
    return render((
      <PostPlace />
    ));
  }

  context('게시글 상세 정보 중 장소 정보 컴포넌트는', () => {
    beforeEach(() => {
      place = {
        name: '대구삼성라이온즈파크',
        address: '대구 수성구 야구전설로 1 대구삼성라이온즈파크',
        contactNumber: '02-9876-5432',
      };
    });

    it('장소 이름, 장소 주소, 장소 연락처 정보로 구성됨', () => {
      renderPostPlace();

      screen.getByText('장소 정보');
      screen.getByText('대구삼성라이온즈파크');
      screen.getByText('대구 수성구 야구전설로 1 대구삼성라이온즈파크');
      screen.getByText('02-9876-5432');
    });
  });
});
