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
          author: '작성자 1',
          detail: '동네 야구대회 나가실 분 모집합니다',
        },
        {
          id: 3,
          author: '작성자 2',
          detail: '풋살마렵네 재야의 고수들 모여라',
        },
      ],
      teams: [
        {
          id: 1,
          postId: 1,
          name: '단일 팀',
          membersCount: 4,
          targetMembersCount: 12,
        },
        {
          id: 2,
          postId: 3,
          name: '단일 팀',
          membersCount: 5,
          targetMembersCount: 6,
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
          currentParticipants: 5,
          targetPartipantsCount: 6,
        },
      ],
    })))),
);

export default server;
