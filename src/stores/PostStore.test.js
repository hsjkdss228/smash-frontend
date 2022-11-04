import context from 'jest-plugin-context';
import PostStore from './PostStore';

import server from '../testServer';

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
    it('게시글, 팀, 포지션, 멤버 정보를 조합해 게시글 리스트를 생성하고 상태로 저장', async () => {
      await postStore.fetchPosts();

      const { posts } = postStore;

      const postLength = Object.keys(posts[0]).length;

      expect(postLength).toBe(17);
      expect(posts.length).toBe(2);
      expect(posts[0].positions.length).toBe(3);
      expect(posts[1].positions.length).toBe(1);
    });
  });

  context('API 서버에 특정 게시글의 상세 데이터를 요청할 경우', () => {
    it('게시글, 팀, 포지션, 멤버 정보를 조합해 게시글 상세 데이터를 생성하고 상태로 저장', async () => {
      const postId = 1;
      await postStore.fetchPost(postId);

      const { information, teamsAndPositions } = postStore;

      // console.log(information);
      // console.log(teamsAndPositions);
      // console.log(teamsAndPositions[0].positions);
      // console.log(teamsAndPositions[1].positions[0].members);

      const informationSize = Object.keys(information).length;
      const teamsAndPositionsSize = Object.keys(teamsAndPositions).length;

      expect(informationSize).toBe(17);
      expect(teamsAndPositionsSize).toBe(2);
      expect(teamsAndPositions[0].positions.length).toBe(1);
      expect(teamsAndPositions[1].positions[0].members.length).toBe(2);
    });
  });
});
