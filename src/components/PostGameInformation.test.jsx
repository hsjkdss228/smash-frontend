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
    hits,
  }) => {
    render((
      <PostGameInformation
        type={type}
        date={date}
        place={place}
        currentMemberCount={currentMemberCount}
        targetMemberCount={targetMemberCount}
        hits={hits}
      />
    ));
  };

  context('경기 정보가 전달된 경우', () => {
    const type = '테니스';
    const date = '2024년 10월 24일 13:00~16:00';
    const place = '올림픽공원 테니스경기장';
    const currentMemberCount = 3;
    const targetMemberCount = 4;
    const hits = 9999;

    it('경기 정보를 출력', () => {
      renderPostGameInformation({
        type,
        date,
        place,
        currentMemberCount,
        targetMemberCount,
        hits,
      });

      screen.getByText('테니스');
      screen.getByText('2024년 10월 24일 13:00~16:00');
      screen.getByText('올림픽공원 테니스경기장');
      screen.getByText('3/4명 참가 중');
      screen.getByText('9999 hits');
    });
  });
});
