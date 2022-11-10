import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import Posts from './Posts';

describe('Posts', () => {
  const renderPosts = ({
    posts, images, games, places, roles,
  }) => {
    render((
      <Posts
        posts={posts}
        images={images}
        games={games}
        places={places}
        roles={roles}
      />
    ));
  };

  context('등록된 게시글이 존재하는 경우', () => {
    const posts = [
      {
        id: 1,
        userId: 1,
        author: '황인우',
        type: '참가자 모집',
        hits: 100,
      },
      {
        id: 2,
        userId: 2,
        author: '전민지',
        type: '참가자 모집',
        hits: 10000,
      },
    ];
    const images = [
      {
        id: 1,
        postId: 1,
        url: 'Image url of Post 1',
      },
      {
        id: 2,
        postId: 2,
        url: 'Image url of Post 2',
      },
    ];
    const games = [
      {
        id: 1,
        postId: 1,
        date: '2022년 11월 9일 09:00~11:00',
        exercise: '축구',
        type: '연습경기',
        level: '아마추어',
        membersCount: 13,
        targetMembersCount: 22,
      },
      {
        id: 2,
        postId: 2,
        date: '2022년 11월 12일 19:00~22:00',
        exercise: '야구',
        type: '경기',
        level: '선출 경력 1년 이상',
        membersCount: 8,
        targetMembersCount: 15,
      },
    ];
    const places = [
      {
        id: 1,
        gameId: 1,
        name: '상암월드컵경기장',
      },
      {
        id: 2,
        gameId: 2,
        name: '고척스카이돔',
      },
    ];
    const roles = [
      {
        id: 1,
        gameId: 1,
        name: '포지션무관',
      },
      {
        id: 2,
        gameId: 2,
        name: '투수',
      },
      {
        id: 3,
        gameId: 2,
        name: '야수',
      },
      {
        id: 4,
        gameId: 2,
        name: '포수',
      },
    ];

    it('각 게시물의 썸네일 출력', () => {
      renderPosts({
        posts, images, games, places, roles,
      });

      screen.getByText(/황인우/);
      screen.getByAltText('1');
      screen.getByText(/2022년 11월 9일 09:00~11:00/);
      screen.getByText(/상암월드컵경기장/);
      screen.getByText(/포지션무관/);

      screen.getByText(/전민지/);
      screen.getByAltText('2');
      screen.getByText(/2022년 11월 12일 19:00~22:00/);
      screen.getByText(/고척스카이돔/);
      screen.getByText(/투수/);
      screen.getByText(/야수/);
      screen.getByText(/포수/);
    });
  });

  context('등록된 게시글이 존재하지 않는 경우', () => {
    const posts = [];
    const images = [];
    const games = [];
    const places = [];
    const roles = [];

    it('게시물 미존재 안내 메세지 출력', () => {
      renderPosts(
        posts, images, games, places, roles,
      );

      screen.getByText(/등록된 게시물이 존재하지 않습니다./);
    });
  });
});
