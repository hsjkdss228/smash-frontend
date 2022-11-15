import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostGameInformation from './PostGameInformation';

describe('PostGameInformation', () => {
  const renderPostGameInformation = ({
    type,
    date,
    place,
    currentMemberCount,
    targetMemberCount,
  }) => {
    render((
      <PostGameInformation
        type={type}
        date={date}
        place={place}
        currentMemberCount={currentMemberCount}
        targetMemberCount={targetMemberCount}
      />
    ));
  };

  context('경기 정보가 전달된 경우', () => {
    const type = '테니스';
    const date = '2024년 10월 24일 13:00~16:00';
    const place = '올림픽공원 테니스경기장';
    const currentMemberCount = 3;
    const targetMemberCount = 4;

    it('경기 정보를 출력', () => {
      renderPostGameInformation({
        type,
        date,
        place,
        currentMemberCount,
        targetMemberCount,
      });

      screen.getByText('종목: 테니스');
      screen.getByText('날짜: 2024년 10월 24일 13:00~16:00');
      screen.getByText('장소: 올림픽공원 테니스경기장');
      screen.getByText('참가인원: 3/4명');
    });
  });
});
