/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const { apiBaseUrl } = config;

const postTestServer = setupServer(
  rest.get(`${apiBaseUrl}/posts`, async (request, response, context) => {
    const accessToken = await request.headers.get('Authorization');

    if (accessToken) {
      return response(context.json({
        posts: [
          {
            id: 1,
            hits: 334,
            game: {
              type: '축구',
              date: '2022년 10월 19일 13:00~16:00',
              place: '대전월드컵경기장',
              currentMemberCount: 16,
              targetMemberCount: 22,
              isRegistered: false,
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
              isRegistered: true,
            },
          },
        ],
      }));
    }

    return response(context.status(400));
  }),

  rest.post(`${apiBaseUrl}/registers/games/:gameId`, async (request, response, context) => {
    // TODO: 진짜 accessToken으로 하고 싶다면 .get().substring
    // localStorage.setItem() 계열로 직접 설정해주고

    const accessToken = await request.headers.get('Authorization');
    const { gameId } = await request.params;

    if (gameId === '1' && accessToken) {
      return response(context.json({
        gameId: 1,
      }));
    }

    return response(context.status(400));
  }),

  rest.delete(`${apiBaseUrl}/members/games/:gameId`, async (request, response, context) => {
    const accessToken = await request.headers.get('Authorization');
    const { gameId } = await request.params;

    if (gameId === '1' && accessToken) {
      return response(context.status(204));
    }

    return response(context.status(400));
  }),
);

export default postTestServer;
