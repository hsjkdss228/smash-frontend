import context from 'jest-plugin-context';
import PostFormStore from './PostFormStore';

import { postApiService } from '../services/PostApiService';

describe('PostFormStore', () => {
  let postFormStore;

  // TODO: change 계열 메서드 호출 시 상태 변경 검증

  context('게시글 생성 API에 상태로 저장하고 있는 데이터를 전달해 호출하면', () => {
    beforeEach(() => {
      postFormStore = new PostFormStore();
    });

    it('생성된 게시글 id를 반환해 반환', async () => {
      postApiService.setAccessToken('userId 1');
      postFormStore.gameExercise = '스케이트';
      postFormStore.gameDate = '2022년 12월 31일';
      postFormStore.gameStartHour = '10';
      postFormStore.gameStartMinute = '00';
      postFormStore.gameEndHour = '12';
      postFormStore.gameEndMinute = '30';
      postFormStore.gamePlace = '롯데월드 아이스링크';
      postFormStore.gameTargetMemberCount = '12';
      postFormStore.postDetail = '스케이트 입문자 모집!';

      const postId = await postFormStore.createPost();
      expect(postId).toBe(1);
    });
  });
});
