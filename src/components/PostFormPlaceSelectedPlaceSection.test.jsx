import {
  fireEvent, render, screen,
} from '@testing-library/react';
import context from 'jest-plugin-context';
import PostFormPlaceSelectedPlaceSection from './PostFormPlaceSelectedPlaceSection';

let searchPlaceMode;
let inputPlaceDirectlyMode;
let placeName;
let placeAddress;
let formErrors;
let serverError;
const changePlaceNameDirectly = jest.fn();
const changePlaceAddressDirectly = jest.fn();
jest.mock('../hooks/usePostFormStore', () => () => ({
  searchPlaceMode,
  inputPlaceDirectlyMode,
  placeName,
  placeAddress,
  formErrors,
  serverError,
  changePlaceNameDirectly,
  changePlaceAddressDirectly,
}));

describe('PostFormPlaceSelectedPlaceSection', () => {
  function renderPostFormPlaceSelectedPlaceSection() {
    render((
      <PostFormPlaceSelectedPlaceSection />
    ));
  }

  beforeEach(() => {
    formErrors = {
      BLANK_PLACE: '',
    };
    jest.clearAllMocks();
  });

  context('장소 입력 폼 중 장소 정보 출력 컴포넌트는', () => {
    it('장소 이름 입력란, 장소 주소 입력란으로 구성됨', () => {
      renderPostFormPlaceSelectedPlaceSection();

      screen.getByText('장소 이름');
      screen.getByText('장소 주소');
    });

    context('장소 선택 모드일 경우', () => {
      beforeEach(() => {
        searchPlaceMode = true;
        inputPlaceDirectlyMode = false;
        placeName = '';
        placeAddress = '';
      });

      it('선택된 장소라는 대체 텍스트를 출력', () => {
        renderPostFormPlaceSelectedPlaceSection();

        screen.getByPlaceholderText('선택된 장소 이름');
        screen.getByPlaceholderText('선택된 장소 주소');
        expect(screen.getByPlaceholderText('선택된 장소 이름')
          .closest('input')).toBeDisabled();
        expect(screen.getByPlaceholderText('선택된 장소 주소')
          .closest('input')).toBeDisabled();
      });
    });

    context('직접 입력 모드일 경우', () => {
      beforeEach(() => {
        searchPlaceMode = false;
        inputPlaceDirectlyMode = true;
        placeName = '';
        placeAddress = '';
      });

      it('입력할 장소라는 대체 텍스트를 출력', () => {
        renderPostFormPlaceSelectedPlaceSection();

        screen.getByPlaceholderText('입력할 장소 이름');
        screen.getByPlaceholderText('입력할 장소 주소');
      });
    });
  });

  context('장소 이름 및 주소 입력란에 내용을 입력할 경우', () => {
    it('장소 정보 입력 상태를 변경하는 함수 호출', () => {
      renderPostFormPlaceSelectedPlaceSection();

      fireEvent.change(screen.getByLabelText('장소 이름'), {
        target: { value: '입력한 장소 이름' },
      });
      fireEvent.change(screen.getByLabelText('장소 주소'), {
        target: { value: '입력한 장소 주소' },
      });
      expect(changePlaceNameDirectly).toBeCalledWith('입력한 장소 이름');
      expect(changePlaceAddressDirectly).toBeCalledWith('입력한 장소 주소');
    });
  });

  context('에러 상태에 장소 이름을 입력하지 않은 에러가 존재할 경우', () => {
    beforeEach(() => {
      formErrors = {
        BLANK_PLACE: '장소를 지정하지 않았습니다.',
      };
    });

    it('장소를 지정하지 않았다는 에러 메시지를 Placeholder에 출력', () => {
      renderPostFormPlaceSelectedPlaceSection();

      expect(screen.getAllByPlaceholderText('장소를 지정하지 않았습니다.').length)
        .toBe(2);
    });
  });
});
