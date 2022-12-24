import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostFormExerciseName from './PostFormExerciseName';

let gameExercise;
let formErrors;
const changeGameExercise = jest.fn();
jest.mock('../hooks/usePostFormStore', () => () => ({
  gameExercise,
  formErrors,
  changeGameExercise,
}));

describe('PostFormExerciseName', () => {
  function renderPostFormExerciseName() {
    render((
      <PostFormExerciseName />
    ));
  }

  beforeEach(() => {
    gameExercise = '';
    formErrors = {
      BLANK_GAME_EXERCISE: '',
    };
  });

  context('게시글 입력 폼 중 운동 종목 입력 폼은', () => {
    it('제목, 종목 입력란으로 구성됨', () => {
      renderPostFormExerciseName();

      screen.getByText('종목');
      screen.getByPlaceholderText('종목 이름을 입력해주세요.');
    });
  });

  context('종목 입력란에 내용을 입력할 경우', () => {
    it('종목 입력 상태를 변경하는 함수 호출', () => {
      renderPostFormExerciseName();

      fireEvent.change(screen.getByLabelText('종목'), {
        target: { value: '입력할 운동 종목' },
      });
      expect(changeGameExercise).toBeCalledWith('입력할 운동 종목');
    });
  });

  context('에러 상태에 종목을 입력하지 않은 에러가 존재할 경우', () => {
    beforeEach(() => {
      formErrors = {
        BLANK_GAME_EXERCISE: '종목을 입력하지 않았습니다.',
      };
    });

    it('종목을 입력하지 않았다는 에러 메시지를 Placeholder에 출력', () => {
      renderPostFormExerciseName();

      screen.getByPlaceholderText('종목을 입력하지 않았습니다.');
    });
  });
});
