import context from 'jest-plugin-context';
import PostFormStore from './PostFormStore';

import { postApiService } from '../services/PostApiService';

describe('PostFormStore', () => {
  let postFormStore;

  // TODO: change 계열 메서드 호출 시 상태 변경 검증

  beforeEach(() => {
    postFormStore = new PostFormStore();
  });

  context('상태 변경 함수가 호출되면', () => {
    const date = new Date('2022-11-26T00:00:00.000Z');
    it('받아온 값을 상태에 반영 후 publish', () => {
      postFormStore.changeGameDate(date);

      const { gameDate } = postFormStore;
      expect(gameDate).toStrictEqual(new Date('2022-11-26T00:00:00.000Z'));
    });
  });

  context('게시글 생성 API에 상태로 저장하고 있는 데이터를 전달해 호출하면', () => {
    it('생성된 게시글 id를 반환해 반환', async () => {
      postApiService.setAccessToken('userId 1');
      postFormStore.gameExercise = '스케이트';
      postFormStore.gameDate = new Date('2022-12-31T00:00:00.000Z');
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
