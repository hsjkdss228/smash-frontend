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
          hits: 334,
          game: {
            type: '축구',
            date: '2022년 10월 19일 13:00~16:00',
            place: '대전월드컵경기장',
            currentMemberCount: 16,
            targetMemberCount: 22,
          },
        },
        {
          id: 2,
          hits: 10,
          game: {
            type: '농구',
            date: '2022년 10월 20일 15:00~17:00',
            place: '잠실실내체육관',
            currentMemberCount: 2,
            targetMemberCount: 12,
          },
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
