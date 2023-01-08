import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostFormDetail from './PostFormDetail';

let postDetail;
let formErrors;
const changePostDetail = jest.fn();
jest.mock('../hooks/usePostFormStore', () => () => ({
  postDetail,
  formErrors,
  changePostDetail,
}));

describe('PostFormDetail', () => {
  function renderPostFormDetail() {
    render((
      <PostFormDetail />
    ));
  }

  beforeEach(() => {
    postDetail = '';
    formErrors = {
      BLANK_POST_DETAIL: '',
    };
  });

  context('게시글 입력 폼 중 상세 내용 입력 폼은', () => {
    it('제목, 상세 내용 입력란으로 구성됨', () => {
      renderPostFormDetail();

      screen.getByText('상세 내용');
      screen.getByPlaceholderText('운동 상세 내용을 입력해주세요.');
    });
  });

  context('상세 내용 입력란에 내용을 입력할 경우', () => {
    it('상세 내용 입력 상태를 변경하는 함수 호출', () => {
      renderPostFormDetail();

      fireEvent.change(screen.getByLabelText('상세 내용'), {
        target: { value: '입력할 상세 내용' },
      });
      expect(changePostDetail).toBeCalledWith('입력할 상세 내용');
    });
  });

  context('에러 상태에 상세 내용을 입력하지 않은 에러가 존재할 경우', () => {
    beforeEach(() => {
      formErrors = {
        BLANK_POST_DETAIL: '상세 내용을 입력하지 않았습니다.',
      };
    });

    it('상세 내용을 입력하지 않았다는 에러 메시지를 Placeholder에 출력', () => {
      renderPostFormDetail();

      screen.getByPlaceholderText('상세 내용을 입력하지 않았습니다.');
    });
  });
});
