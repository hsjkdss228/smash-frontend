import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostsContent from './PostsContent';

describe('PostsContent', () => {
  const renderPostsContent = ({
    hits,
    type,
    date,
    place,
    currentMemberCount,
    targetMemberCount,
  }) => {
    render((
      <PostsContent
        hits={hits}
        type={type}
        date={date}
        place={place}
        currentMemberCount={currentMemberCount}
        targetMemberCount={targetMemberCount}
      />
    ));
  };

  context('등록된 게시글이 존재하는 경우', () => {
    const hits = 100;
    const type = '야구';
    const date = '2022년 10월 19일 08:00~11:00';
    const place = '잠실야구장';
    const currentMemberCount = 4;
    const targetMemberCount = 12;

    it('각 게시물의 썸네일 출력', () => {
      renderPostsContent({
        hits,
        type,
        date,
        place,
        currentMemberCount,
        targetMemberCount,
      });

      screen.getByText('조회수: 100');
      screen.getByText('야구');
      screen.getByText(/2022년 10월 19일 08:00~11:00/);
      screen.getByText(/잠실야구장/);
      screen.getByText(/4/);
      screen.getByText(/12/);
    });
  });
});