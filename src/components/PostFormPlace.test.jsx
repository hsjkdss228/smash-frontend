import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostFormPlace from './PostFormPlace';

let placeName;
let formErrors;
let serverError;
const changePlaceName = jest.fn();
jest.mock('../hooks/usePostFormStore', () => () => ({
  placeName,
  formErrors,
  serverError,
  changePlaceName,
}));

describe('PostFormPlace', () => {
  function renderPostFormPlace() {
    render((
      <PostFormPlace />
    ));
  }

  beforeEach(() => {
    placeName = '';
    formErrors = {
      BLANK_PLACE_NAME: '',
    };
  });

  context('게시글 입력 폼 중 장소 이름 입력 폼은', () => {
    it('제목, 장소 이름 입력란으로 구성됨', () => {
      renderPostFormPlace();

      screen.getByText('장소');
      screen.getByPlaceholderText('장소 이름을 입력해주세요.');
    });
  });

  context('장소 입력란에 내용을 입력할 경우', () => {
    it('장소 입력 상태를 변경하는 함수 호출', () => {
      renderPostFormPlace();

      fireEvent.change(screen.getByLabelText('장소'), {
        target: { value: '입력할 운동 장소 이름' },
      });
      expect(changePlaceName).toBeCalledWith('입력할 운동 장소 이름');
    });
  });

  context('에러 상태에 장소 이름을 입력하지 않은 에러가 존재할 경우', () => {
    beforeEach(() => {
      formErrors = {
        BLANK_PLACE_NAME: '장소를 입력하지 않았습니다.',
      };
    });

    it('장소를 입력하지 않았다는 에러 메시지를 Placeholder에 출력', () => {
      renderPostFormPlace();

      screen.getByPlaceholderText('장소를 입력하지 않았습니다.');
    });
  });

  context('에러 상태에 등록되지 않은 장소를 입력한 에러가 존재할 경우', () => {
    beforeEach(() => {
      placeName = '등록되지 않은 장소 이름';
      formErrors = {
        BLANK_PLACE_NAME: '',
      };
      serverError = 'Place Not Found';
    });

    it('등록되지 않은 장소라는 에러 메시지를 출력', () => {
      renderPostFormPlace();

      screen.getByDisplayValue('등록되지 않은 장소 이름');
      screen.getByText('등록되지 않은 장소입니다.');
    });
  });
});
