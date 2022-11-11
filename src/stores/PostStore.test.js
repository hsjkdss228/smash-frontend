import context from 'jest-plugin-context';
import PostStore from './PostStore';

import { postApiService } from '../services/PostApiService';

describe('PostStore', () => {
  const postStore = new PostStore();

  context('API 서버에 게시글 리스트 데이터를 요청할 경우', () => {
    it('백엔드 서버에서 응답으로 전달된 post 리스트를 상태로 저장', async () => {
      postApiService.setAccessToken('userId 1');
      await postStore.fetchPosts();

      const { posts } = postStore;

      expect(posts.length).toBe(2);
      expect(posts[0].hits).toBe(334);
      expect(posts[0].game.isRegistered).toBe(false);
      expect(posts[1].game.targetMemberCount).toBe(12);
      expect(posts[1].game.isRegistered).toBe(true);
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
