import context from 'jest-plugin-context';
import PostFormStore from './PostFormStore';

import { postApiService } from '../services/PostApiService';

describe('PostFormStore', () => {
  let postFormStore;

  beforeEach(() => {
    postFormStore = new PostFormStore();
  });

  context('날짜 상태 변경 함수가 호출되면', () => {
    const date = new Date('2022-11-26T00:00:00.000Z');
    it('받아온 값을 날짜 상태에 반영 후 publish', () => {
      postFormStore.changeGameDate(date);

      const { gameDate } = postFormStore;
      expect(gameDate).toStrictEqual(new Date('2022-11-26T00:00:00.000Z'));
    });
  });

  context('시작 시간 오전/오후 상태 변경 함수가 호출되면', () => {
    const startTimeAmPm = 'pm';
    it('받아온 값을 시작 시간 오전/오후 상태에 반영 후 publish', () => {
      postFormStore.changeGameStartTimeAmPm(startTimeAmPm);

      const { gameStartTimeAmPm } = postFormStore;
      expect(gameStartTimeAmPm).toBe('pm');
    });
  });

  context('종료 시간 오전/오후 상태 변경 함수가 호출되면', () => {
    const endTimeAmPm = 'am';
    it('받아온 값을 종료 시간 오전/오후 상태에 반영 후 publish', () => {
      postFormStore.changeGameEndTimeAmPm(endTimeAmPm);

      const { gameEndTimeAmPm } = postFormStore;
      expect(gameEndTimeAmPm).toBe('am');
    });
  });

  context('게시글 생성 API에 상태로 저장하고 있는 데이터를 전달해 호출하면', () => {
    it('생성된 게시글 id를 반환해 반환', async () => {
      postApiService.setAccessToken('userId 1');
      postFormStore.gameExercise = '스케이트';
      postFormStore.gameDate = new Date('2022-12-31T00:00:00.000Z');
      postFormStore.gameStartTimeAmPm = 'am';
      postFormStore.gameStartHour = '10';
      postFormStore.gameStartMinute = '00';
      postFormStore.gameEndTimeAmPm = 'pm';
      postFormStore.gameEndHour = '04';
      postFormStore.gameEndMinute = '30';
      postFormStore.gamePlace = '롯데월드 아이스링크';
      postFormStore.gameTargetMemberCount = '12';
      postFormStore.postDetail = '스케이트 입문자 모집!';

      const postId = await postFormStore.createPost();
      expect(postId).toBe(1);
    });
  });

  context('게시글 생성 API 호출 시 입력되지 않은 상태가 있을 경우', () => {
    it('해당 에러 메세지의 상태와 에러 발생 여부 flag 상태를 활성화', async () => {
      postFormStore.gameExercise = '스케이트';
      postFormStore.gameDate = new Date('2022-12-31T00:00:00.000Z');
      postFormStore.gameStartTimeAmPm = 'am';
      postFormStore.gameStartHour = '';
      postFormStore.gameStartMinute = '00';
      postFormStore.gameEndTimeAmPm = 'pm';
      postFormStore.gameEndHour = '04';
      postFormStore.gameEndMinute = '30';
      postFormStore.gamePlace = '';
      postFormStore.gameTargetMemberCount = '12';
      postFormStore.postDetail = '';

      const postId = await postFormStore.createPost();

      const { formErrors, hasFormErrors } = postFormStore;

      expect(postId).toBeFalsy();
      expect(formErrors.BLANK_GAME_DATE).toBeFalsy();
      expect(formErrors.BLANK_GAME_START_HOUR)
        .toBe('시작 시간을 입력해주세요.');
      expect(formErrors.BLANK_GAME_PLACE)
        .toBe('운동 장소 이름을 입력해주세요.');
      expect(formErrors.BLANK_POST_DETAIL)
        .toBe('게시글 상세 내용을 입력해주세요.');
      expect(hasFormErrors).toBeTruthy();
    });
  });
});
