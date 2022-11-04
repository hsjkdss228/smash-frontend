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
          author: '야구선수 1',
          createdAt: '10/22 18:00:33',
          hits: 15,
          images: [
            { id: 1, url: 'Image Url 1', isThumbnailImage: false },
            { id: 2, url: 'Image Url 2', isThumbnailImage: false },
            { id: 3, url: 'Image Url 3', isThumbnailImage: true },
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
            { id: 4, url: 'Image Url 11', isThumbnailImage: true },
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
          cost: 10000,
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
          targetParticipantsCount: 3,
        },
        {
          id: 2,
          teamId: 1,
          name: '내야수',
          currentParticipants: 2,
          targetParticipantsCount: 5,
        },
        {
          id: 3,
          teamId: 1,
          name: '외야수',
          currentParticipants: 2,
          targetParticipantsCount: 4,
        },
        {
          id: 4,
          teamId: 2,
          name: '자유포지션',
          currentParticipants: 1,
          targetParticipantsCount: 6,
        },
      ],
      members: [
        {
          id: 1,
          teamId: 1,
          positionId: 2,
          name: '야구선수 1',
          mannerScore: 7.5,
        },
        {
          id: 2,
          teamId: 1,
          positionId: 2,
          name: '야구선수 2',
          mannerScore: 5,
        },
        {
          id: 3,
          teamId: 1,
          positionId: 3,
          name: '야구선수 3',
          mannerScore: 8,
        },
        {
          id: 4,
          teamId: 1,
          positionId: 3,
          name: '야구선수 4',
          mannerScore: 9,
        },
        {
          id: 5,
          teamId: 2,
          positionId: 4,
          name: '풋살선수 1',
          mannerScore: 5,
        },
      ],
      places: [
        {
          id: 1,
          postId: 1,
          name: '구의야구공원',
        },
        {
          id: 2,
          postId: 3,
          name: '자양중학교',
        },
      ],
    })))),

  rest.get(`${apiBaseUrl}/posts/:postId`, async (request, response, context) => {
    const { postId } = await request.params;

    if (postId === '1') {
      return response(context.json({
        post: {
          id: 1,
          postType: '선수 모집',
          author: '김용기',
          createdAt: '10/22 18:00:33',
          hits: 15,
          images: [
            { id: 1, url: 'Image Url 1', isThumbnailImage: false },
            { id: 2, url: 'Image Url 2', isThumbnailImage: false },
            { id: 3, url: 'Image Url 3', isThumbnailImage: true },
          ],
          detail: '풋살합시다',
        },
        teams: [
          {
            id: 1,
            postId: 1,
            name: '1팀',
            exercise: '풋살',
            exerciseDate: '11/1 18:00~21:00',
            exerciseType: '연습경기',
            exerciseLevel: '아마추어',
            exerciseGender: '남성',
            membersCount: 1,
            targetMembersCount: 6,
            cost: 1000,
          },
          {
            id: 2,
            postId: 1,
            name: '2팀',
            exercise: '풋살',
            exerciseDate: '11/1 18:00~21:00',
            exerciseType: '연습경기',
            exerciseLevel: '아마추어',
            exerciseGender: '남성',
            membersCount: 2,
            targetMembersCount: 6,
            cost: 1000,
          },
        ],
        positions: [
          {
            id: 1,
            teamId: 1,
            name: '자유',
            currentParticipants: 1,
            targetParticipantsCount: 6,
          },
          {
            id: 2,
            teamId: 2,
            name: '자유',
            currentParticipants: 2,
            targetParticipantsCount: 6,
          },
        ],
        members: [
          {
            id: 1,
            teamId: 1,
            positionId: 1,
            name: '김용기',
            mannerScore: 7.5,
          },
          {
            id: 2,
            teamId: 2,
            positionId: 2,
            name: '이예찬',
            mannerScore: 5,
          },
          {
            id: 3,
            teamId: 2,
            positionId: 2,
            name: '길민종',
            mannerScore: 8,
          },
        ],
        place: {
          id: 1,
          postId: 1,
          name: '자양한강공원 풋살장',
        },
      }));
    }

    return response(context.status(400));
  }),
);

export default server;
