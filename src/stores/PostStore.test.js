import context from 'jest-plugin-context';
import PostStore from './PostStore';

import server from '../testServer';
import { postApiService } from '../services/PostApiService';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('PostStore', () => {
  const postStore = new PostStore();

  context('API 서버에 게시글 리스트 데이터를 요청할 경우', () => {
    it('백엔드 서버에서 응답으로 전달된 post 리스트를 상태로 저장', async () => {
      await postStore.fetchPosts();
      await postStore.fetchImages();
      await postStore.fetchGames();
      await postStore.fetchPlaces();
      await postStore.fetchRoles();

      const {
        posts, images, games, places, roles,
      } = postStore;

      expect(posts.length).toBe(2);
      expect(posts[0].author).toBe('황인우');
      expect(posts[1].type).toBe('참가자 모집');
      expect(images.length).toBe(2);
      expect(images[0].url).toBe('Image url of Post 1');
      expect(images[1].url).toContain('2');
      expect(games.length).toBe(2);
      expect(games[0].exercise).toBe('축구');
      expect(games[1].targetMembersCount).toBe(15);
      expect(places.length).toBe(2);
      expect(places[0].id).toBe(1);
      expect(places[1].name).toBe('고척스카이돔');
      expect(roles.length).toBe(4);
    });
  });

  // context('API 서버에 특정 게시글의 상세 데이터를 요청할 경우', () => {
  //   it('게시글, 팀, 포지션, 멤버 정보를 조합해 게시글 상세 데이터를 생성하고 상태로 저장', async () => {
  //     const postId = 1;
  //     postApiService.setAccessToken('userId 1 is Author');
  //     await postStore.fetchPost(postId);

  //     const { postInformation, postPositions } = postStore;

  //     const informationSize = Object.keys(postInformation).length;
  //     const positionsSize = Object.keys(postPositions).length;

  //     expect(informationSize).toBe(16);

  //     expect(positionsSize).toBe(4);
  //     expect(postPositions.userStatus).toBe('isAuthor');
  //     expect(postPositions.teams[0].roles.length).toBe(2);
  //     expect(postPositions.teams[0].roles[0].members.length).toBe(1);
  //   });
  // });
});
