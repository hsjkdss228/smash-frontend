import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostFormPlace from './PostFormPlace';

let serverError;
jest.mock('../hooks/usePostFormStore', () => () => ({
  serverError,
}));

jest.mock('./PostFormPlaceInputModeButtons', () => jest.fn());
jest.mock('./PostFormPlaceSearchSection', () => jest.fn());
jest.mock('./PostFormPlaceSelectedPlaceSection', () => jest.fn());

describe('PostFormPlace', () => {
  function renderPostFormPlace() {
    render((
      <PostFormPlace />
    ));
  }

  context('등록되지 않은 장소라는 에러 상태가 존재할 경우', () => {
    beforeEach(() => {
      serverError = '등록되지 않은 장소입니다.';
    });

    it('등록되지 않은 장소라는 메시지를 출력', () => {
      renderPostFormPlace();

      screen.getByText('등록되지 않은 장소입니다.');
    });
  });
});
