/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const { apiBaseUrl } = config;

const postTestServer = setupServer(
  // fetchPosts
  rest.get(
    `${apiBaseUrl}/posts`,
    async (request, response, context) => {
      const accessToken = await request.headers.get('Authorization')
        .substring('bearer '.length);

      if (accessToken === 'userId 1') {
        return response(context.json({
          posts: [
            {
              id: 1,
              hits: 334,
              isAuthor: false,
              game: {
                type: '축구',
                date: '2022년 10월 19일 13:00~16:00',
                place: '대전월드컵경기장',
                currentMemberCount: 16,
                targetMemberCount: 22,
                registerId: -1,
                registerStatus: 'none',
              },
            },
            {
              id: 2,
              hits: 10,
              isAuthor: false,
              game: {
                type: '농구',
                date: '2022년 10월 20일 15:00~17:00',
                place: '잠실실내체육관',
                currentMemberCount: 2,
                targetMemberCount: 12,
                registerId: 10,
                registerStatus: 'accepted',
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
    },
  ),

  // registerToGame
  rest.post(
    `${apiBaseUrl}/registers/games/:gameId`,
    async (request, response, context) => {
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
    },
  ),

  // cancelParticipateGame
  rest.patch(
    `${apiBaseUrl}/registers/games/:gameId`,
    async (request, response, context) => {
      const accessToken = await request.headers.get('Authorization');
      const { gameId } = await request.params;

      if (gameId === '1' && accessToken) {
        return response(context.status(204));
      }

      return response(context.status(400));
    },
  ),

  // login
  rest.post(
    `${apiBaseUrl}/session`,
    async (request, response, context) => {
      const { identifier, password } = await request.json();

      if (identifier === 'hsjkdss228' && password === 'Password!1') {
        return response(
          context.status(201),
          context.json({
            accessToken: 'TOKEN',
          }),
        );
      }

      if (identifier === '' && password === 'Password!1') {
        return response(
          context.status(400),
          context.json({
            errorMessage: '아이디를 입력해주세요.',
          }),
        );
      }

      if (identifier === 'notexistingid12' && password === 'Password!1') {
        return response(
          context.status(400),
          context.json({
            errorMessage: '존재하지 않는 아이디입니다.',
          }),
        );
      }

      if (identifier === 'hsjkdss228' && password === '') {
        return response(
          context.status(400),
          context.json({
            errorMessage: '비밀번호를 입력해주세요.',
          }),
        );
      }

      if (identifier === 'hsjkdss228' && password === 'wrongPassword!1') {
        return response(
          context.status(400),
          context.json({
            errorMessage: '비밀번호가 일치하지 않습니다.',
          }),
        );
      }

      return response(
        context.status(400),
        context.json({
          errorMessage: '알 수 없는 에러입니다.',
        }),
      );
    },
  ),

  // fetchPost
  rest.get(
    `${apiBaseUrl}/posts/:postId`,
    async (request, response, context) => {
      const accessToken = await request.headers.get('Authorization')
        .substring('bearer '.length);
      const { postId } = await request.params;

      if (postId === '1' && accessToken === 'userId 1') {
        return response(
          context.status(200),
          context.json({
            id: 1,
            hits: 223,
            authorName: '작성자',
            authorPhoneNumber: '010-1111-2222',
            detail: '점심먹고 가볍게 탁구하실분?',
            isAuthor: true,
          }),
        );
      }

      return response(
        context.status(400),
      );
    },
  ),

  // fetchGame
  rest.get(
    `${apiBaseUrl}/games/posts/:postId`,
    async (request, response, context) => {
      const accessToken = await request.headers.get('Authorization')
        .substring('bearer '.length);
      const { postId } = await request.params;

      if (postId === '1' && accessToken === 'userId 1') {
        return response(
          context.status(200),
          context.json({
            id: 1,
            type: '탁구',
            date: '2022년 10월 19일 12:30~13:30',
            place: '서울숲탁구클럽',
            currentMemberCount: 2,
            targetMemberCount: 4,
            registerId: -1,
            registerStatus: 'none',
          }),
        );
      }

      return response(
        context.status(400),
      );
    },
  ),

  // fetchMembers
  rest.get(
    `${apiBaseUrl}/registers/members/games/:gameId`,
    async (request, response, context) => {
      const { gameId } = await request.params;

      if (gameId === '1') {
        return response(
          context.status(200),
          context.json({
            members: [
              {
                id: 1,
                name: '작성자',
                gender: '남성',
                phoneNumber: '010-1111-2222',
              },
              {
                id: 2,
                name: '사용자 2',
                gender: '여성',
                phoneNumber: '010-9999-9999',
              },
            ],
          }),
        );
      }

      return response(
        context.status(400),
      );
    },
  ),

  // fetchApplicants
  rest.get(
    `${apiBaseUrl}/registers/applicants/games/:gameId`,
    async (request, response, context) => {
      const { gameId } = await request.params;

      if (gameId === '2') {
        return response(
          context.status(200),
          context.json({
            applicants: [
              {
                id: 1,
                name: '신청자 1',
                gender: '여성',
                phoneNumber: '010-1357-1357',
              },
              {
                id: 2,
                name: '신청자 2',
                gender: '남성',
                phoneNumber: '010-2468-2468',
              },
            ],
          }),
        );
      }

      return response(
        context.status(400),
      );
    },
  ),

  // change register state methods
  rest.patch(
    `${apiBaseUrl}/registers/:registerId`,
    async (request, response, context) => {
      const status = await request.url.searchParams.get('status');

      if (status === 'canceled'
        || status === 'accepted'
        || status === 'rejected') {
        return response(
          context.status(204),
        );
      }

      return response(
        context.status(400),
      );
    },
  ),

  // createPost
  rest.post(
    `${apiBaseUrl}/posts`,
    async (request, response, context) => {
      const {
        gameExercise,
        gameDate,
        gameStartTimeAmPm,
        gameStartHour,
        gameStartMinute,
        gameEndTimeAmPm,
        gameEndHour,
        gameEndMinute,
        gamePlace,
        gameTargetMemberCount,
        postDetail,
      } = await request.json();
      const accessToken = await request.headers.get('Authorization')
        .substring('bearer '.length);

      if (gameExercise === '스케이트'
        && gameDate === new Date('2022-12-31T00:00:00.000Z').toISOString()
        && gameStartTimeAmPm === 'am'
        && gameStartHour === '10'
        && gameStartMinute === '00'
        && gameEndTimeAmPm === 'pm'
        && gameEndHour === '04'
        && gameEndMinute === '30'
        && gamePlace === '롯데월드 아이스링크'
        && gameTargetMemberCount === '12'
        && postDetail === '스케이트 입문자 모집!'
        && accessToken === 'userId 1') {
        return response(
          context.status(201),
          context.json({
            postId: 1,
          }),
        );
      }

      return response(
        context.status(400),
      );
    },
  ),
);

export default postTestServer;
