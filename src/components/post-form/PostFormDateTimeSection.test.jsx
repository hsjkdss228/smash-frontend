import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostFormDateTimeSection from './PostFormDateTimeSection';

let formErrors;
jest.mock('../hooks/usePostFormStore', () => () => ({
  formErrors,
}));

jest.mock('./PostFormDate', () => jest.fn());
jest.mock('./PostFormTime', () => jest.fn());

describe('PostFormDateTimeSection', () => {
  function renderPostFormDateTimeSection() {
    render((
      <PostFormDateTimeSection />
    ));
  }

  context('게시글 입력 폼 중 날짜 및 시간 입력 폼 상단에는', () => {
    beforeEach(() => {
      formErrors = {
        BLANK_GAME_DATE: '',
        BLANK_GAME_START_AM_PM: '',
        BLANK_GAME_START_HOUR: '날짜 및 시간을 입력하지 않았습니다.',
        BLANK_GAME_START_MINUTE: '날짜 및 시간을 입력하지 않았습니다.',
        BLANK_GAME_END_AM_PM: '',
        BLANK_GAME_END_HOUR: '날짜 및 시간을 입력하지 않았습니다.',
        BLANK_GAME_END_MINUTE: '',
      };
    });

    it('제목이 있고, 에러 상태에 에러가 존재할 경우 에러 메시지가 출력됨', () => {
      renderPostFormDateTimeSection();

      screen.getByText('날짜 및 시간');
      screen.getByText('날짜 및 시간을 입력하지 않았습니다.');
    });
  });

  context('에러 상태에 에러가 존재하지 않을 경우', () => {
    beforeEach(() => {
      formErrors = {
        BLANK_GAME_DATE: '',
        BLANK_GAME_START_AM_PM: '',
        BLANK_GAME_START_HOUR: '',
        BLANK_GAME_START_MINUTE: '',
        BLANK_GAME_END_AM_PM: '',
        BLANK_GAME_END_HOUR: '',
        BLANK_GAME_END_MINUTE: '',
      };
    });

    it('에러 메시지는 출력되지 않음', () => {
      renderPostFormDateTimeSection();

      expect(screen.queryByText('날짜 및 시간을 입력하지 않았습니다.')).toBe(null);
    });
  });
});
