/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const { apiBaseUrl } = config;

const server = setupServer(
  rest.get(`${apiBaseUrl}/posts/list`, (request, response, context) => (
    response(context.json({
      posts: [
        {
          id: 1,
          postType: '선수 모집',
          author: '작성자 1',
          createdAt: '10/22 18:00:33',
          hits: 15,
          images: [
            { url: 'Image Url 1', isThumbnail: false },
            { url: 'Image Url 2', isThumbnail: false },
            { url: 'Image Url 3', isThumbnail: true },
          ],
          detail: '동네 야구대회 나가실 분 모집합니다',
        },
        {
          id: 3,
          postType: '선수 모집',
          author: '작성자 2',
          createdAt: '10/22 18:00:33',
          hits: 30,
          images: [
            { url: 'Image Url 11', isThumbnail: true },
          ],
          detail: '풋살마렵네 재야의 고수들 모여라',
        },
      ],
      teams: [
        {
          id: 1,
          postId: 1,
          name: '단일 팀',
          exercise: '야구',
          exerciseDate: '11/1 18:00~21:00',
          exerciseType: '연습경기',
          exerciseLevel: '아마추어',
          exerciseGender: '남성',
          membersCount: 4,
          targetMembersCount: 12,
          cost: 5000,
        },
        {
          id: 2,
          postId: 3,
          name: '단일 팀',
          exercise: '풋살',
          exerciseDate: '11/2 15:00~17:00',
          exerciseType: '경기',
          exerciseLevel: '선출',
          exerciseGender: '혼성',
          membersCount: 5,
          targetMembersCount: 6,
          cost: 5000,
        },
      ],
      positions: [
        {
          id: 1,
          teamId: 1,
          name: '투수',
          currentParticipants: 0,
          targetPartipantsCount: 3,
        },
        {
          id: 2,
          teamId: 1,
          name: '내야수',
          currentParticipants: 2,
          targetPartipantsCount: 5,
        },
        {
          id: 3,
          teamId: 1,
          name: '외야수',
          currentParticipants: 2,
          targetPartipantsCount: 4,
        },
        {
          id: 4,
          teamId: 2,
          name: '자유포지션',
          currentParticipants: 1,
          targetPartipantsCount: 6,
        },
      ],
      members: [
        {
          id: 1,
          name: '야구선수 1',
          teamId: 1,
          positionId: 2,
          mannerScore: 7.5,
        },
        {
          id: 2,
          name: '야구선수 2',
          teamId: 1,
          positionId: 2,
          mannerScore: 5,
        },
        {
          id: 3,
          name: '야구선수 3',
          teamId: 1,
          positionId: 3,
          mannerScore: 8,
        },
        {
          id: 4,
          name: '야구선수 4',
          teamId: 1,
          positionId: 3,
          mannerScore: 9,
        },
        {
          id: 5,
          name: '풋살선수 1',
          teamId: 2,
          positionId: 4,
          mannerScore: 5,
        },
      ],
      places: [
        {
          id: 1,
          name: '구의야구공원',
          teamId: 1,
        },
        {
          id: 2,
          name: '자양중학교',
          teamId: 2,
        },
      ],
    })))),
);

export default server;
