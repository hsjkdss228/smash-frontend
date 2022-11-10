/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const { apiBaseUrl } = config;

const server = setupServer(
  rest.get(`${apiBaseUrl}/posts`, (request, response, context) => (
    response(context.json(
      [
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
      ],
    ))
  )),
  rest.get(`${apiBaseUrl}/images/thumbnail`, (request, response, context) => (
    response(context.json(
      [
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
      ],
    ))
  )),
  rest.get(`${apiBaseUrl}/games`, (request, response, context) => (
    response(context.json(
      [
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
      ],
    ))
  )),
  rest.get(`${apiBaseUrl}/places`, (request, response, context) => (
    response(context.json(
      [
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
      ],
    ))
  )),
  rest.get(`${apiBaseUrl}/roles`, (request, response, context) => (
    response(context.json(
      [
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
      ],
    ))
  )),

  // rest.get(`${apiBaseUrl}/posts/:postId`, async (request, response, context) => {
  //   const { postId } = await request.params;
  //   const accessToken = await request.headers.get('Authorization');

  //   if (postId === '1' && accessToken) {
  //     return response(context.json({

  //     }));
  //   }

  //   return response(context.status(400));
  // }),
);

export default server;
