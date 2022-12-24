import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostFormDate from './PostFormDate';

// jest.mock('date-fns/esm/locale', () => null);

let gameDate;
const changeGameDate = jest.fn();
jest.mock('../hooks/usePostFormStore', () => () => ({
  gameDate,
  changeGameDate,
}));

describe('PostFormDate', () => {
  function renderPostFormDate() {
    render((
      <PostFormDate />
    ));
  }

  beforeEach(() => {
    gameDate = new Date('2022-12-22T09:00:00.000Z');
  });

  context('게시글 입력 폼 날짜 입력 폼은', () => {
    it('현재 날짜 값에 맞는 DatePicker 라이브러리 달력이 표출됨', () => {
      renderPostFormDate();

      screen.getByText('날짜');
      screen.getByText('12월 2022');
      screen.getByText('일');
      screen.getByText('토');
      expect(screen.getAllByText('30').length).toBe(2);
      expect(screen.getAllByText('31').length).toBe(1);
    });

    context('날짜를 선택할 경우', () => {
      it('입력된 날짜 상태를 변경하는 함수 호출', () => {
        renderPostFormDate();

        // TODO: minDate 설정이 들어가 있는데,
        //   날짜가 바뀌어서 minDate 이전의 날짜가 되면 날짜를 선택할 수 없는 문제가 있다.
        fireEvent.click(screen.getByText('25'));
        expect(changeGameDate)
          .toBeCalledWith(new Date('2022-12-25T09:00:00.000Z'));
      });

      it('조회 시점 날짜보다 이전 날짜를 선택한 경우에는 날짜 상태 변경 함수가 호출되지 않음', () => {
        renderPostFormDate();

        fireEvent.click(screen.getByText('1'));
        expect(changeGameDate)
          .not.toBeCalledWith(new Date('2022-12-01T09:00:00.000Z'));
      });
    });
  });
});
