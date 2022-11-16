/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const { apiBaseUrl } = config;

const postTestServer = setupServer(
  rest.get(`${apiBaseUrl}/posts`, async (request, response, context) => {
    const accessToken = await request.headers.get('Authorization')
      .substring('bearer '.length);

    if (accessToken === 'userId 1') {
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

    if (accessToken === 'userId 4') {
      return response(
        context.status(400),
        context.json({
          errorMessage: '주어진 게임 번호에 해당하는 게임을 찾을 수 없습니다.',
        }),
      );
    }

    return response(context.status(400));
  }),

  rest.post(`${apiBaseUrl}/registers/games/:gameId`, async (request, response, context) => {
    const accessToken = await request.headers.get('Authorization')
      .substring('bearer '.length);
    const { gameId } = await request.params;

    if (gameId === '1' && accessToken === 'userId 1') {
      return response(context.json({
        gameId: 1,
      }));
    }

    if (gameId === '100' && accessToken === 'userId 1') {
      return response(
        context.status(400),
        context.json({
          errorCode: 100,
          errorMessage: '주어진 게임 번호에 해당하는 게임을 찾을 수 없습니다.',
        }),
      );
    }

    if (gameId === '1' && accessToken === 'already registered userId 2') {
      return response(
        context.status(400),
        context.json({
          errorCode: 101,
          errorMessage: '이미 신청이 완료된 운동입니다.',
        }),
      );
    }

    if (gameId === '1' && accessToken === 'not existed userId 3') {
      return response(
        context.status(400),
        context.json({
          errorCode: 102,
          errorMessage: '주어진 사용자 번호에 해당하는 사용자를 찾을 수 없습니다.',
        }),
      );
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

  rest.post(`${apiBaseUrl}/session`, async (request, response, context) => {
    const { userId } = await request.json();

    if (userId === 10) {
      return response(
        context.status(201),
        context.json({
          accessToken: 'TOKEN',
        }),
      );
    }

    if (userId === '') {
      return response(
        context.status(400),
        context.json({
          errorMessage: 'user Id를 입력해주세요. (200)',
        }),
      );
    }

    if (userId === 1234) {
      return response(
        context.status(400),
        context.json({
          errorMessage: 'user Id 인코딩 과정에서 문제가 발생했습니다. (202)',
        }),
      );
    }

    return response(
      context.status(400),
      context.json({
        errorMessage: '존재하지 않는 user Id 입니다. (201)',
      }),
    );
  }),
);

export default postTestServer;
