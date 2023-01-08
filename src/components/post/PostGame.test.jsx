import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostGame from './PostGame';

let post;
jest.mock('../hooks/usePostStore', () => () => ({
  post,
}));
let game;
jest.mock('../hooks/useGameStore', () => () => ({
  game,
}));
let place;
jest.mock('../hooks/usePlaceStore', () => () => ({
  place,
}));

describe('PostGame', () => {
  function renderPostGame() {
    render((
      <PostGame />
    ));
  }

  context('게시글 상세 정보 중 운동 정보 컴포넌트는', () => {
    beforeEach(() => {
      post = {
        // TODO: 게시물 작성 시점이 전달되어야 함
        hits: 10,
      };
      game = {
        type: '테니스',
        date: '2024년 10월 24일 오후 02:00 ~ 오후 04:00',
        currentMemberCount: 2,
        targetMemberCount: 6,
      };
      place = {
        name: '올림픽공원 테니스경기장',
      };
    });

    it('운동 종류, 운동 예정 날짜, 장소 이름, 현재 인원/모집 인원, 작성 시점, 게시물 조회수로 구성됨', () => {
      renderPostGame();

      screen.getByText('테니스');
      screen.getByText('2024년 10월 24일 오후 02:00 ~ 오후 04:00');
      screen.getByText('올림픽공원 테니스경기장');
      screen.getByText('2/6명 참가 중');
      screen.getByText('작성시간');
      screen.getByText('10 조회');
    });
  });
});
