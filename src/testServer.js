/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const { apiBaseUrl } = config;

const testServer = setupServer(
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
              thumbnailImageUrl: 'image url 1',
              isAuthor: false,
              game: {
                id: 1,
                type: '축구',
                date: '2022년 10월 19일 오후 01:00 ~ 오후 04:00',
                currentMemberCount: 16,
                targetMemberCount: 22,
                registerId: -1,
                registerStatus: 'none',
              },
              place: {
                name: '대전월드컵경기장',
              },
            },
            {
              id: 2,
              hits: 10,
              thumbnailImageUrl: 'image url 2',
              isAuthor: false,
              game: {
                id: 1,
                type: '농구',
                date: '2022년 10월 20일 오후 03:00 ~ 오후 05:00',
                currentMemberCount: 2,
                targetMemberCount: 12,
                registerId: 10,
                registerStatus: 'accepted',
              },
              place: {
                name: '농구장',
              },
            },
          ],
        }));
      }

      if (accessToken === 'userId 4 where UserNotFound error occurs') {
        return response(
          context.status(400),
          context.json('User Not Found'),
        );
      }

      if (accessToken === 'userId 10 where GameNotFound error occurs') {
        return response(
          context.status(400),
          context.json('Game Not Found'),
        );
      }

      if (accessToken === 'userId 99 where PlaceNotFound error occurs') {
        return response(
          context.status(400),
          context.json('Place Not Found'),
        );
      }

      return response(context.status(400));
    },
  ),

  // fetchPost
  rest.get(
    `${apiBaseUrl}/posts/:postId`,
    async (request, response, context) => {
      const accessToken = await request.headers.get('Authorization')
        .substring('bearer '.length);
      const { postId } = await request.params;

      const normalPostId = '1';
      if (postId === normalPostId && accessToken === 'userId 1') {
        return response(
          context.status(200),
          context.json({
            id: 1,
            hits: 223,
            authorInformation: {
              id: 1,
              name: '작성자',
              gender: '남성',
              phoneNumber: '010-1111-2222',
              profileImageUrl: 'image url 1',
              mannerScore: 9.5,
            },
            detail: '탁구 비는 인원 모집',
            imageUrls: [
              'image url 1',
              'image url 2',
            ],
            isAuthor: true,
          }),
        );
      }

      const wrongPostId = '9999';
      if (postId === wrongPostId) {
        return response(
          context.status(404),
          context.json('Post Not Found'),
        );
      }

      if (accessToken === 'userId 22 where UserNotFound error occurs') {
        return response(
          context.status(404),
          context.json('User Not Found'),
        );
      }

      return response(
        context.status(400),
      );
    },
  ),

  // login
  rest.post(
    `${apiBaseUrl}/session`,
    async (request, response, context) => {
      const { username, password } = await request.json();

      if (username === 'hsjkdss228' && password === 'Password!1') {
        return response(
          context.status(201),
          context.json({
            accessToken: 'TOKEN',
          }),
        );
      }

      if (username === '' && password === 'Password!1') {
        return response(
          context.status(400),
          context.json({
            errorMessage: '아이디를 입력해주세요.',
          }),
        );
      }

      if (username === 'notexistingid12' && password === 'Password!1') {
        return response(
          context.status(400),
          context.json({
            errorMessage: '존재하지 않는 아이디입니다.',
          }),
        );
      }

      if (username === 'hsjkdss228' && password === '') {
        return response(
          context.status(400),
          context.json({
            errorMessage: '비밀번호를 입력해주세요.',
          }),
        );
      }

      if (username === 'hsjkdss228' && password === 'wrongPassword!1') {
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
            placeId: 1,
            type: '탁구',
            date: '2022년 10월 19일 12:30 ~ 13:30',
            currentMemberCount: 2,
            targetMemberCount: 4,
            registerId: -1,
            registerStatus: 'none',
          }),
        );
      }

      if (accessToken === 'Wrong Access Token') {
        return response(
          context.status(404),
          context.json('User Not Found'),
        );
      }

      if (postId === '444') {
        return response(
          context.status(404),
          context.json('Game Not Found'),
        );
      }

      return response(
        context.status(400),
      );
    },
  ),

  // searchPlace
  rest.get(
    `${apiBaseUrl}/places/search`,
    async (request, response, context) => {
      const placeName = await request.url.searchParams.get('keyword');

      if (placeName === '대구') {
        return response(
          context.status(200),
          context.json({
            searchedPlaces: [
              {
                id: 1,
                name: 'DGB대구은행파크',
                address: '대구 북구 고성로 191',
              },
              {
                id: 2,
                name: '대구삼성라이온즈파크',
                address: '대구 수성구 야구전설로 1',
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

  // fetchPlace
  rest.get(
    `${apiBaseUrl}/places/:placeId`,
    async (request, response, context) => {
      const { placeId } = await request.params;

      if (placeId === '1') {
        return response(
          context.status(200),
          context.json({
            id: 1,
            name: '목동야구장',
            exercise: '야구',
            address: '주소지',
            contactNumber: '02-0000-0000',
          }),
        );
      }

      if (placeId === '4444') {
        return response(
          context.status(404),
          context.json('Place Not Found'),
        );
      }

      return response(
        context.status(400),
      );
    },
  ),

  // fetchMembers
  rest.get(
    `${apiBaseUrl}/games/:gameId/members`,
    async (request, response, context) => {
      const { gameId } = await request.params;

      if (gameId === '1') {
        return response(
          context.status(200),
          context.json({
            members: [
              {
                registerId: 1,
                userInformation: {
                  id: 1,
                  name: '작성자',
                  gender: '남성',
                  phoneNumber: '010-1111-2222',
                  profileImageUrl: 'Image Url 1',
                  mannerScore: 10.0,
                },
              },
              {
                registerId: 2,
                userInformation: {
                  id: 2,
                  name: '사용자 2',
                  gender: '여성',
                  phoneNumber: '010-9999-9999',
                  profileImageUrl: 'Image Url 2',
                  mannerScore: 0.1,
                },
              },
            ],
          }),
        );
      }

      if (gameId === '444') {
        return response(
          context.status(404),
          context.json('User Not Found'),
        );
      }

      return response(
        context.status(400),
      );
    },
  ),

  // fetchApplicants
  rest.get(
    `${apiBaseUrl}/games/:gameId/applicants`,
    async (request, response, context) => {
      const { gameId } = await request.params;

      if (gameId === '2') {
        return response(
          context.status(200),
          context.json({
            applicants: [
              {
                registerId: 3,
                userInformation: {
                  id: 3,
                  name: '신청자 1',
                  gender: '여성',
                  phoneNumber: '010-1357-1357',
                  profileImageUrl: 'Image Url 3',
                  mannerScore: 5.0,
                },
              },
              {
                registerId: 4,
                userInformation: {
                  id: 4,
                  name: '신청자 2',
                  gender: '남성',
                  phoneNumber: '010-2468-2468',
                  profileImageUrl: 'Image Url 4',
                  mannerScore: 6.9,
                },
              },
            ],
          }),
        );
      }

      if (gameId === '666') {
        return response(
          context.status(404),
          context.json('User Not Found'),
        );
      }

      return response(
        context.status(400),
      );
    },
  ),

  // registerGame
  rest.post(
    `${apiBaseUrl}/registers/games/:gameId`,
    async (request, response, context) => {
      const accessToken = await request.headers.get('Authorization')
        .substring('bearer '.length);
      const { gameId } = await request.params;

      const normalGameId = '1';
      if (gameId === normalGameId && accessToken === 'userId 1') {
        return response(
          context.status(201),
          context.json({
            gameId: 1,
          }),
        );
      }

      if (accessToken === 'wrong userId 4444') {
        return response(
          context.status(404),
          context.json('User Not Found'),
        );
      }

      const notExistingGameId = '6646';
      if (gameId === notExistingGameId) {
        return response(
          context.status(404),
          context.json('Game Not Found'),
        );
      }

      const alreadyJoinedGameId = '123';
      if (gameId === alreadyJoinedGameId) {
        return response(
          context.status(400),
          context.json('Already Joined Game'),
        );
      }

      const alreadyFullGameId = '987';
      if (gameId === alreadyFullGameId) {
        return response(
          context.status(400),
          context.json('Game Is Full'),
        );
      }

      const gameIdWithoutPost = '7272';
      if (gameId === gameIdWithoutPost) {
        return response(
          context.status(404),
          context.json('Post Not Found'),
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

  // change register state methods
  rest.patch(
    `${apiBaseUrl}/registers/:registerId`,
    async (request, response, context) => {
      const accessToken = await request.headers.get('Authorization')
        .substring('bearer '.length);
      const { registerId } = await request.params;
      const status = await request.url.searchParams.get('status');

      const normalRegisterId = '1';

      if (accessToken === 'userId 1'
        && registerId === normalRegisterId
        && (status === 'canceled'
        || status === 'accepted'
        || status === 'rejected')) {
        return response(
          context.status(204),
        );
      }

      const notExistingRegisterId = '4455';
      if (accessToken === 'userId 1'
        && (status === 'canceled'
          || status === 'accepted'
          || status === 'rejected')
        && registerId === notExistingRegisterId) {
        return response(
          context.status(404),
          context.json('Register Not Found'),
        );
      }

      if (accessToken === 'userId 4444'
        && status === 'canceled'
        && registerId === normalRegisterId) {
        return response(
          context.status(400),
          context.json('Is Not Register Of Current User'),
        );
      }

      const registerIdWithoutGame = '273';
      if (accessToken === 'userId 1'
        && status === 'accepted'
        && registerId === registerIdWithoutGame) {
        return response(
          context.status(404),
          context.json('Game Not Found'),
        );
      }

      const registerIdWithAlreadyFullGame = '555';
      if (accessToken === 'userId 1'
        && status === 'accepted'
        && registerId === registerIdWithAlreadyFullGame) {
        return response(
          context.status(400),
          context.json('Game Is Full'),
        );
      }

      const registerIdWithoutUser = '2580';
      if (accessToken === 'userId 1'
        && status === 'accepted'
        && registerId === registerIdWithoutUser) {
        return response(
          context.status(404),
          context.json('User Not Found'),
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
        post,
        game,
        exercise,
        place,
      } = await request.json();
      const accessToken = await request.headers.get('Authorization')
        .substring('bearer '.length);

      if (exercise.name === '스케이트'
        && game.date === new Date('2022-12-31T09:00:00.000Z').toISOString()
        && game.startTimeAmPm === 'am'
        && game.startHour === '10'
        && game.startMinute === '00'
        && game.endTimeAmPm === 'pm'
        && game.endHour === '04'
        && game.endMinute === '30'
        && place.name === '롯데월드 아이스링크'
        && place.address === '서울 송파구 올림픽로 240'
        && place.isRegisteredPlace === true
        && game.targetMemberCount === '12'
        && post.detail === '스케이트 입문자 모집!'
        && accessToken === 'userId 1') {
        return response(
          context.status(201),
          context.json({
            postId: 1,
          }),
        );
      }

      if (place.name === '서버 에러가 발생하는 장소 이름') {
        return response(
          context.status(400),
          context.json('Place Not Found'),
        );
      }

      return response(
        context.status(400),
      );
    },
  ),

  // deletePost
  rest.delete(
    `${apiBaseUrl}/posts/:postId`,
    async (request, response, context) => {
      const { postId } = await request.params;
      const accessToken = await request.headers.get('Authorization')
        .substring('bearer '.length);

      const normalPostId = '1';
      if (postId === normalPostId && accessToken === 'userId 1') {
        return response(
          context.status(204),
        );
      }

      const wrongPostId = '9999';
      if (postId === wrongPostId) {
        return response(
          context.status(404),
          context.json('Post Not Found'),
        );
      }

      if (accessToken === 'another userId 122') {
        return response(
          context.status(400),
          context.json('User Is Not Author'),
        );
      }

      const postIdWhereGameNotFound = '7876';
      if (postId === postIdWhereGameNotFound) {
        return response(
          context.status(404),
          context.json('Game Not Found'),
        );
      }

      return response(
        context.status(400),
      );
    },
  ),

  // fetchNotices
  rest.get(
    `${apiBaseUrl}/notices`,
    async (request, response, context) => {
      const accessToken = await request.headers.get('Authorization')
        .substring('bearer '.length);

      if (accessToken === 'userId 1') {
        return response(
          context.status(200),
          context.json({
            notices: [
              {
                id: 1,
                status: 'unread',
                createdAt: '6시간 전',
                title: '내가 신청한 운동 모집 게시글의 작성자가 신청을 수락했습니다.',
                detail: '신청한 게임 시간',
              },
              {
                id: 2,
                status: 'read',
                createdAt: '12시간 전',
                title: '내가 작성한 운동 모집 게시글에 새로운 참가 신청이 있습니다.',
                detail: '등록한 신청자: 황인우',
              },
            ],
            serverError: '',
          }),
        );
      }

      if (accessToken === 'Wrong Access Token') {
        return response(
          context.status(400),
          context.json('Authentication Error'),
        );
      }

      return response(
        context.status(400),
      );
    },
  ),

  // readNotice
  rest.patch(
    `${apiBaseUrl}/notices/:noticeId`,
    async (request, response, context) => {
      const { noticeId } = await request.params;

      if (noticeId === '1') {
        return response(
          context.status(204),
        );
      }

      return response(
        context.status(400),
      );
    },
  ),

  // readSelectedNotices
  // deleteSelectedNotices
  rest.patch(
    `${apiBaseUrl}/notices`,
    async (request, response, context) => {
      // const { ids } = await request.json();
      const status = await request.url.searchParams.get('status');

      if (status === 'read') {
        return response(
          context.status(204),
        );
      }

      if (status === 'deleted') {
        return response(
          context.status(204),
        );
      }

      return response(
        context.status(400),
      );
    },
  ),

  // fetchUnreadNoticeCount
  rest.get(
    `${apiBaseUrl}/notice-count`,
    async (request, response, context) => {
      const accessToken = await request.headers.get('Authorization')
        .substring('bearer '.length);

      if (accessToken === 'userId 1') {
        return response(
          context.status(200),
          context.json({
            count: 1,
          }),
        );
      }

      return response(
        context.status(400),
      );
    },
  ),

  // fetchUserName
  rest.get(
    `${apiBaseUrl}/users/me`,
    async (request, response, context) => {
      const accessToken = await request.headers.get('Authorization')
        .substring('bearer '.length);

      if (accessToken === 'userId 1') {
        return response(
          context.status(200),
          context.json({
            name: '황인우',
          }),
        );
      }

      if (accessToken === 'not existing userId 333') {
        return response(
          context.status(404),
          context.json('User Not Found'),
        );
      }

      return response(
        context.status(400),
      );
    },
  ),

  // signUp
  rest.post(
    `${apiBaseUrl}/users`,
    async (request, response, context) => {
      const {
        name,
        username,
        password,
        confirmPassword,
        gender,
        phoneNumber,
      } = await request.json();

      if (name === '황인우'
          && username === 'hsjkdss228'
          && password === 'Password!1'
          && confirmPassword === 'Password!1'
          && gender === '남성'
          && phoneNumber === '01012345678') {
        return response(
          context.status(201),
          context.json({
            enrolledName: '황인우',
          }),
        );
      }

      if (username === 'alreadyregisteredid12') {
        return response(
          context.status(400),
          context.json('이미 등록된 아이디입니다.'),
        );
      }

      if (password === 'Password!1'
        && confirmPassword === 'wrongPassword!1') {
        return response(
          context.status(400),
          context.json('비밀번호 확인이 일치하지 않습니다.'),
        );
      }

      return response(
        context.status(400),
      );
    },
  ),
);

export default testServer;
