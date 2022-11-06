import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostList from './PostList';

describe('PostList', () => {
  context('등록된 게시글이 존재하는 경우', () => {
    const posts = [
      {
        id: 1,
        author: '작성자 1',
        hits: 15,
        images: [
          { id: 3, url: 'Image Url 3', isThumbnailImage: true },
        ],
        game: {
          exercise: '야구',
          exerciseDate: '11/1 18:00~21:00',
          exerciseType: '대회',
          exerciseLevel: '초보',
          place: '구의야구공원',
          teams: [
            {
              id: 1,
              name: '1팀',
              membersCount: 4,
              targetMembersCount: 12,
              roles: [
                {
                  id: 1,
                  name: '투수',
                },
                {
                  id: 2,
                  name: '야수',
                },
              ],
            },
            {
              id: 2,
              name: '2팀',
              membersCount: 2,
              targetMembersCount: 12,
              roles: [
                {
                  id: 3,
                  name: '포지션무관',
                },
              ],
            },
          ],
        },
      },
      {
        id: 2,
        author: '작성자 2',
        hits: 30,
        images: [
          { id: 6, url: 'Image Url 6', isThumbnailImage: true },
        ],
        game: {
          exercise: '축구',
          exerciseDate: '11/3 19:00~21:00',
          exerciseType: '연습경기',
          exerciseLevel: '중상급',
          place: '자양유수지 축구장',
          teams: [
            {
              id: 3,
              name: '1팀',
              membersCount: 4,
              targetMembersCount: 10,
              roles: [
                {
                  id: 1,
                  name: '필드플레이어',
                },
                {
                  id: 2,
                  name: '골키퍼',
                },
              ],
            },
            {
              id: 4,
              name: '2팀',
              membersCount: 6,
              targetMembersCount: 10,
              roles: [
                {
                  id: 3,
                  name: '자유포지션',
                },
              ],
            },
          ],
        },
      },
    ];

    it('썸네일 출력', () => {
      render((
        <PostList
          posts={posts}
        />
      ));

      screen.getByText(/11\/1 18:00~21:00/);
      screen.getByText(/Image Url 3/);
      screen.getByText(/구의야구공원/);
      screen.getByText(/작성자 1/);
      screen.getByText(/투수/);
      screen.getByText(/야수/);
      screen.getByText(/포지션무관/);
      screen.getByText('야구');
      screen.getByText(/조회수: 15회/);
      screen.getByText(/연습경기/);
      screen.getByText(/초보/);

      screen.getByText(/11\/3 19:00~21:00/);
      screen.getByText(/Image Url 6/);
      screen.getByText(/구의야구공원/);
      screen.getByText(/작성자 2/);
      screen.getByText(/필드플레이어/);
      screen.getByText(/골키퍼/);
      screen.getByText(/자유포지션/);
      screen.getByText('축구');
      screen.getByText(/조회수: 30회/);
      screen.getByText(/대회/);
      screen.getByText(/중상급/);
    });
  });
});
