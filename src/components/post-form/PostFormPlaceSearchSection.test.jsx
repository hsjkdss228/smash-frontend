import {
  fireEvent, render, screen,
} from '@testing-library/react';
import context from 'jest-plugin-context';
import PostFormPlaceSearchSection from './PostFormPlaceSearchSection';

let searchPlaceMode;
let placeSearchTimerId;
let placeNameSearching;
let searchedPlaces;
const changePlaceNameSearching = jest.fn();
const searchPlace = jest.fn();
const selectPlace = jest.fn();
jest.mock('../hooks/usePostFormStore', () => () => ({
  searchPlaceMode,
  placeSearchTimerId,
  placeNameSearching,
  searchedPlaces,
  changePlaceNameSearching,
  searchPlace,
  selectPlace,
}));

describe('PostFormPlaceSearchSection', () => {
  function renderPostFormPlaceSearchSection() {
    render((
      <PostFormPlaceSearchSection />
    ));
  }

  beforeEach(() => {
    searchPlaceMode = true;
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
  });

  context('장소 입력 폼 중 장소 검색어 입력 컴포넌트는', () => {
    it('장소 검색어 입력란, 장소 검색 결과 출력 컴포넌트로 구성', () => {
      renderPostFormPlaceSearchSection();

      screen.getByText('장소 이름 검색');
    });

    context('장소 검색 모드가 아닌 경우에는 ', () => {
      beforeEach(() => {
        searchPlaceMode = false;
      });

      it('컴포넌트가 출력되지 않음', () => {
        renderPostFormPlaceSearchSection();

        expect(screen.queryByText('장소 이름 검색')).toBe(null);
      });
    });
  });

  context('장소 검색어 입력란에 검색어를 입력하면', () => {
    const input = '운동장';

    it('입력된 장소 검색어 상태를 변경하는 함수 호출', async () => {
      renderPostFormPlaceSearchSection();

      fireEvent.change(screen.getByLabelText('장소 이름 검색'), {
        target: { value: input },
      });
      expect(changePlaceNameSearching).toBeCalledWith(input);
    });
  });

  // context('장소 검색어 입력란에 검색어가 입력된 것이 확인되었을 경우', () => {
  //   beforeEach(() => {
  //     placeNameSearching = '운동장';
  //   });

  //   it('장소를 검색하는 함수 호출', async () => {
  //     renderPostFormPlaceSearchSection();

  //     await waitFor(() => {
  //       expect(setTimeout).toBeCalled();
  //     });
  //   });
  // });

  context('장소 검색 결과 출력란은', () => {
    context('검색 결과가 제공되지 않았을 경우에는 ', () => {
      beforeEach(() => {
        searchedPlaces = [];
      });

      it('검색된 장소가 없다는 메시지를 출력', () => {
        renderPostFormPlaceSearchSection();

        screen.getByText('검색된 장소가 없습니다.');
      });
    });

    context('검색 결과가 제공되었을 경우에는 ', () => {
      beforeEach(() => {
        searchedPlaces = [
          {
            id: 1,
            name: 'DGB대구은행파크',
            address: '대구 북구 고성로 191',
          },
          {
            id: 2,
            name: '대구삼성라이온즈파크',
            address: '대구 수성구 야구전설로 1',
          },
        ];
      });

      it('검색된 장소 리스트를 출력', () => {
        renderPostFormPlaceSearchSection();

        screen.getByText('DGB대구은행파크');
        screen.getByText('대구삼성라이온즈파크');
      });

      context('검색된 장소 결과 중 하나를 클릭할 경우', () => {
        it('클릭한 장소를 지정 장소 란에 입력시키는 함수 호출', () => {
          renderPostFormPlaceSearchSection();

          fireEvent.click(screen.getByText('대구삼성라이온즈파크'));
          const index = searchedPlaces.findIndex((place) => (
            place.name === '대구삼성라이온즈파크'
          ));
          expect(selectPlace).toBeCalledWith(index);
        });
      });
    });
  });
});
