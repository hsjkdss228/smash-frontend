import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostFormPlaceInputModeButtons from './PostFormPlaceInputModeButtons';

const changeInputPlaceModeToSearch = jest.fn();
const changeInputPlaceModeToInputDirectly = jest.fn();
jest.mock('../hooks/usePostFormStore', () => () => ({
  changeInputPlaceModeToSearch,
  changeInputPlaceModeToInputDirectly,
}));

describe('PostFormPlaceInputModeButtons', () => {
  function renderPostFormPlaceInputModeButtons() {
    render((
      <PostFormPlaceInputModeButtons />
    ));
  }

  context('장소 입력 폼 중 장소 입력 모드 선택 버튼 컴포넌트는', () => {
    it('장소 검색, 직접 입력 버튼으로 구성', () => {
      renderPostFormPlaceInputModeButtons();

      screen.getByText('장소 검색');
      screen.getByText('직접 입력');
    });
  });

  context('장소 검색 버튼을 클릭하면', () => {
    it('장소 검색 모드로 상태를 변경하는 함수 호출', () => {
      renderPostFormPlaceInputModeButtons();

      fireEvent.click(screen.getByText('장소 검색'));
      expect(changeInputPlaceModeToSearch).toBeCalled();
    });
  });

  context('직접 입력 버튼을 클릭하면', () => {
    it('직접 입력 모드로 상태를 변경하는 함수 호출', () => {
      renderPostFormPlaceInputModeButtons();

      fireEvent.click(screen.getByText('직접 입력'));
      expect(changeInputPlaceModeToInputDirectly).toBeCalled();
    });
  });
});
