import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostFormTime from './PostFormTime';

let gameStartTimeAmPm;
let gameStartHour;
let gameStartMinute;
let gameEndTimeAmPm;
let gameEndHour;
let gameEndMinute;
const changeGameStartTimeAmPm = jest.fn();
const changeGameStartHour = jest.fn();
const changeGameStartMinute = jest.fn();
const changeGameEndTimeAmPm = jest.fn();
const changeGameEndHour = jest.fn();
const changeGameEndMinute = jest.fn();
jest.mock('../hooks/usePostFormStore', () => () => ({
  gameStartTimeAmPm,
  gameStartHour,
  gameStartMinute,
  gameEndTimeAmPm,
  gameEndHour,
  gameEndMinute,
  changeGameStartTimeAmPm,
  changeGameStartHour,
  changeGameStartMinute,
  changeGameEndTimeAmPm,
  changeGameEndHour,
  changeGameEndMinute,
}));

describe('PostFormTime', () => {
  function renderPostFormTime() {
    render((
      <PostFormTime />
    ));
  }

  beforeEach(() => {
    gameStartTimeAmPm = '';
    gameStartHour = '';
    gameStartMinute = '';
    gameEndTimeAmPm = '';
    gameEndHour = '';
    gameEndMinute = '';
  });

  context('게시글 입력 폼 중 시간 입력 폼은', () => {
    it('시작/종료 시간 별 오전/오후 선택 버튼, 시/분 입력 필드로 구성됨', () => {
      renderPostFormTime();

      expect(screen.getAllByText('오전').length).toBe(2);
      expect(screen.getAllByText('오후').length).toBe(2);
      expect(screen.getAllByPlaceholderText('00').length).toBe(4);
      screen.getByText('부터');
      screen.getByText('까지');
    });
  });

  context('오전/오후 버튼틀 클릭할 경우', () => {
    it('각 시간 종류 별 오전/오후 상태를 변경하는 함수 호출', () => {
      renderPostFormTime();

      fireEvent.click(screen.getAllByText(/오전/)[0]);
      expect(changeGameStartTimeAmPm).toBeCalledWith('am');

      fireEvent.click(screen.getAllByText(/오후/)[0]);
      expect(changeGameStartTimeAmPm).toBeCalledWith('pm');

      fireEvent.click(screen.getAllByText(/오전/)[1]);
      expect(changeGameEndTimeAmPm).toBeCalledWith('am');

      fireEvent.click(screen.getAllByText(/오후/)[1]);
      expect(changeGameEndTimeAmPm).toBeCalledWith('pm');
    });
  });

  context('시/분 입력 필드에 시간을 입력할 경우', () => {
    it('시간 입력 상태를 변경하는 함수 호출', () => {
      renderPostFormTime();

      fireEvent.change(screen.getByLabelText('start hour'), {
        target: { value: '9' },
      });
      expect(changeGameStartHour).toBeCalledWith('9');

      fireEvent.change(screen.getByLabelText('start minute'), {
        target: { value: '8' },
      });
      expect(changeGameStartMinute).toBeCalledWith('8');

      fireEvent.change(screen.getByLabelText('end hour'), {
        target: { value: '7' },
      });
      expect(changeGameEndHour).toBeCalledWith('7');

      fireEvent.change(screen.getByLabelText('end minute'), {
        target: { value: '6' },
      });
      expect(changeGameEndMinute).toBeCalledWith('6');
    });
  });
});
