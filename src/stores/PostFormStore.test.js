import context from 'jest-plugin-context';
import PostFormStore from './PostFormStore';

import { postApiService } from '../services/PostApiService';

let postFormStore;

describe('PostFormStore', () => {
  let spyClearFormErrors;

  beforeEach(() => {
    postFormStore = new PostFormStore();
    postApiService.setAccessToken('userId 1');

    spyClearFormErrors = jest.spyOn(postFormStore, 'clearFormErrors');
  });

  context('운동 이름 상태 변경 함수가 호출되면', () => {
    const exerciseName = '운동 이름';

    it('받아온 값을 운동 이름 상태에 반영 후 publish', () => {
      postFormStore.changeGameExercise(exerciseName);

      const { gameExercise } = postFormStore;
      expect(gameExercise).toBe('운동 이름');
      expect(postFormStore.formErrors.BLANK_GAME_EXERCISE).toBeFalsy();
    });
  });

  context('날짜 상태 변경 함수가 호출되면', () => {
    const date = new Date('2022-11-26T00:00:00.000Z');

    it('받아온 값을 날짜 상태에 반영 후 publish', () => {
      postFormStore.changeGameDate(date);

      const { gameDate } = postFormStore;
      expect(gameDate).toStrictEqual(new Date('2022-11-26T00:00:00.000Z'));
      expect(postFormStore.formErrors.BLANK_GAME_DATE).toBeFalsy();
    });
  });

  context('시작 시간 오전/오후 상태 변경 함수가 호출되면', () => {
    const startTimeAmPm = 'pm';

    it('받아온 값을 시작 시간 오전/오후 상태에 반영 후 publish', () => {
      postFormStore.changeGameStartTimeAmPm(startTimeAmPm);

      const { gameStartTimeAmPm } = postFormStore;
      expect(gameStartTimeAmPm).toBe('pm');
      expect(postFormStore.formErrors.BLANK_GAME_START_AM_PM).toBeFalsy();
    });
  });

  context('시작 시간의 시간 상태 변경 함수가 호출되면', () => {
    context('정상적인 범위 내의 시간을 입력한 경우', () => {
      const startHour = 8;

      it('받아온 값을 시작 시간의 시간 상태에 반영 후 publish', () => {
        postFormStore.changeGameStartHour(startHour);

        const { gameStartHour } = postFormStore;
        expect(gameStartHour).toBe(8);
        expect(postFormStore.formErrors.BLANK_GAME_START_HOUR).toBeFalsy();
      });
    });

    context('숫자가 아닌 값을 입력한 경우', () => {
      const wrongStartHourWithString = '꽦꽈꼬깎꾸꺼꽊꽊';

      it('시작 시간의 시간 상태를 비우고 publish', () => {
        postFormStore.changeGameStartHour(wrongStartHourWithString);

        const { gameStartHour } = postFormStore;
        expect(gameStartHour).toBe('');
      });
    });

    context('1보다 작은 값을 입력한 경우', () => {
      const wrongStartHourWithLessThan1 = 0;

      it('시작 시간의 시간 상태를 1로 설정하고 publish', () => {
        postFormStore.changeGameStartHour(wrongStartHourWithLessThan1);

        const { gameStartHour } = postFormStore;
        expect(gameStartHour).toBe(1);
      });
    });

    context('12보다 큰 값을 입력한 경우', () => {
      const wrongStartHourWithMoreThan12 = 999;

      it('시작 시간의 시간 상태를 12로 설정하고 publish', () => {
        postFormStore.changeGameStartHour(wrongStartHourWithMoreThan12);

        const { gameStartHour } = postFormStore;
        expect(gameStartHour).toBe(12);
      });
    });
  });

  context('시작 시간의 분 상태 변경 함수가 호출되면', () => {
    context('정상적인 범위 내의 분을 입력한 경우', () => {
      const startMinute = 40;

      it('받아온 값을 시작 시간의 분 상태에 반영 후 publish', () => {
        postFormStore.changeGameStartMinute(startMinute);

        const { gameStartMinute } = postFormStore;
        expect(gameStartMinute).toBe(40);
        expect(postFormStore.formErrors.BLANK_GAME_START_MINUTE).toBeFalsy();
      });
    });

    context('숫자가 아닌 값이나 0보다 작은 값을 입력하려고 하는 경우', () => {
      const wrongStartMinuteWithString = '홀롤ㄹ루롤롤롤';

      it('시작 시간의 시간 상태를 비우고 publish', () => {
        postFormStore.changeGameStartMinute(wrongStartMinuteWithString);

        const { gameStartMinute } = postFormStore;
        expect(gameStartMinute).toBe('');
      });
    });

    context('59보다 큰 값을 입력한 경우', () => {
      const wrongStartMinuteWithMoreThan59 = 60;

      it('시작 시간의 시간 상태를 12로 설정하고 publish', () => {
        postFormStore.changeGameStartMinute(wrongStartMinuteWithMoreThan59);

        const { gameStartMinute } = postFormStore;
        expect(gameStartMinute).toBe(59);
      });
    });
  });

  context('종료 시간 오전/오후 상태 변경 함수가 호출되면', () => {
    const endTimeAmPm = 'am';

    it('받아온 값을 종료 시간 오전/오후 상태에 반영 후 publish', () => {
      postFormStore.changeGameEndTimeAmPm(endTimeAmPm);

      const { gameEndTimeAmPm } = postFormStore;
      expect(gameEndTimeAmPm).toBe('am');
      expect(postFormStore.formErrors.BLANK_GAME_END_AM_PM).toBeFalsy();
    });
  });

  context('종료 시간의 시간 상태 변경 함수가 호출되면', () => {
    const endHour = 11;

    it('받아온 값을 종료 시간의 시간 상태에 반영 후 publish', () => {
      postFormStore.changeGameEndHour(endHour);

      const { gameEndHour } = postFormStore;
      expect(gameEndHour).toBe(11);
      expect(postFormStore.formErrors.BLANK_GAME_END_HOUR).toBeFalsy();
    });
  });

  context('종료 시간의 분 상태 변경 함수가 호출되면', () => {
    const endMinute = 17;

    it('받아온 값을 종료 시간의 분 상태에 반영 후 publish', () => {
      postFormStore.changeGameEndMinute(endMinute);

      const { gameEndMinute } = postFormStore;
      expect(gameEndMinute).toBe(17);
      expect(postFormStore.formErrors.BLANK_GAME_END_MINUTE).toBeFalsy();
    });
  });

  context('검색할 운동 장소 이름을 변경하는 함수가 호출되면', () => {
    const gamePlaceNameSearching = '대구';

    context('검색 타이머가 활성화된 상태였을 경우', () => {
      beforeEach(() => {
        postFormStore.placeSearchTimerId = 'id';
      });

      it('받아온 값을 운동 장소 이름 상태에 반영 후 publish', async () => {
        await postFormStore.changePlaceNameSearching(gamePlaceNameSearching);

        const { placeNameSearching } = postFormStore;
        expect(placeNameSearching).toBe('대구');
        expect(postFormStore.formErrors.BLANK_PLACE).toBeFalsy();
        expect(postFormStore.serverError).toBeFalsy();
      });
    });
  });

  context('운동 장소를 검색하는 함수가 호출되면', () => {
    beforeEach(() => {
      postFormStore.placeNameSearching = '대구';
    });

    it('반환되는 검색된 장소 배열을 상태로 저장 후 publish', async () => {
      await postFormStore.searchPlace();

      const { searchedPlaces } = postFormStore;
      expect(searchedPlaces.length).toBe(2);
    });
  });

  context('운동 장소 이름 상태를 직접 변경하는 함수가 호출되면', () => {
    const gamePlaceName = '운동 장소 이름';

    it('받아온 값을 운동 장소 이름 상태에 반영 후 publish', () => {
      postFormStore.changePlaceNameDirectly(gamePlaceName);

      const { placeName } = postFormStore;
      expect(placeName).toBe('운동 장소 이름');
      expect(postFormStore.formErrors.BLANK_PLACE).toBeFalsy();
      expect(postFormStore.serverError).toBeFalsy();
    });
  });

  context('운동 장소 주소 상태를 직접 변경하는 함수가 호출되면', () => {
    const gamePlaceAddress = '운동 장소 주소';

    it('받아온 값을 운동 장소 주소 상태에 반영 후 publish', () => {
      postFormStore.changePlaceAddressDirectly(gamePlaceAddress);

      const { placeAddress } = postFormStore;
      expect(placeAddress).toBe('운동 장소 주소');
      expect(postFormStore.formErrors.BLANK_PLACE).toBeFalsy();
      expect(postFormStore.serverError).toBeFalsy();
    });
  });

  context('운동 정원 상태 변경 함수가 호출되면', () => {
    const targetMemberCount = 16;

    it('받아온 값을 운동 정원 상태에 반영 후 publish', () => {
      postFormStore.changeGameTargetMemberCount(targetMemberCount);

      const { gameTargetMemberCount } = postFormStore;
      expect(gameTargetMemberCount).toBe(16);
      expect(postFormStore.formErrors.NULL_GAME_TARGET_MEMBER_COUNT).toBeFalsy();
    });
  });

  context('게시글 상세 정보 상태 변경 함수가 호출되면', () => {
    const detail = '게시글 상세 정보';

    it('받아온 값을 게시글 상세 정보 상태에 반영 후 publish', () => {
      postFormStore.changePostDetail(detail);

      const { postDetail } = postFormStore;
      expect(postDetail).toBe('게시글 상세 정보');
      expect(postFormStore.formErrors.BLANK_POST_DETAIL).toBeFalsy();
    });
  });

  context('게시글 생성 API에 상태로 저장하고 있는 데이터를 전달해 호출하면', () => {
    beforeEach(() => {
      postFormStore.gameExercise = '스케이트';
      postFormStore.gameDate = new Date('2022-12-31T00:00:00.000Z');
      postFormStore.gameStartTimeAmPm = 'am';
      postFormStore.gameStartHour = '10';
      postFormStore.gameStartMinute = '00';
      postFormStore.gameEndTimeAmPm = 'pm';
      postFormStore.gameEndHour = '04';
      postFormStore.gameEndMinute = '30';
      postFormStore.placeName = '롯데월드 아이스링크';
      postFormStore.placeAddress = '서울 송파구 올림픽로 240';
      postFormStore.isRegisteredPlace = true;
      postFormStore.gameTargetMemberCount = '12';
      postFormStore.postDetail = '스케이트 입문자 모집!';
    });

    it('생성된 게시글 id를 반환해 반환', async () => {
      const postId = await postFormStore.createPost();
      expect(spyClearFormErrors).toBeCalled();
      expect(postId).toBe(1);
    });
  });

  context('게시글 생성 API 호출 시 입력되지 않은 상태가 있을 경우', () => {
    beforeEach(() => {
      postFormStore.gameExercise = '스케이트';
      postFormStore.gameDate = new Date('2022-12-31T00:00:00.000Z');
      postFormStore.gameStartTimeAmPm = 'am';
      postFormStore.gameStartHour = '';
      postFormStore.gameStartMinute = '00';
      postFormStore.gameEndTimeAmPm = 'pm';
      postFormStore.gameEndHour = '04';
      postFormStore.gameEndMinute = '30';
      postFormStore.placeName = '';
      postFormStore.placeAddress = '';
      postFormStore.isRegisteredPlace = false;
      postFormStore.gameTargetMemberCount = '12';
      postFormStore.postDetail = '';
    });

    it('해당 에러 메세지의 상태와 에러 발생 여부 flag 상태를 활성화', async () => {
      const postId = await postFormStore.createPost();

      expect(spyClearFormErrors).toBeCalled();

      const { formErrors, hasFormErrors } = postFormStore;

      expect(postId).toBeFalsy();
      expect(formErrors.BLANK_GAME_DATE).toBeFalsy();
      expect(formErrors.BLANK_GAME_START_HOUR)
        .toBe('날짜 및 시간을 입력하지 않았습니다.');
      expect(formErrors.BLANK_PLACE)
        .toBe('장소를 지정하지 않았습니다.');
      expect(formErrors.BLANK_POST_DETAIL)
        .toBe('상세 내용을 입력하지 않았습니다.');
      expect(hasFormErrors).toBeTruthy();
    });
  });

  context('게시글 작성 페이지에 접속하거나, 입력 내용을 초기화시키거나, 게시글 작성을 중단하는 경우에는 '
    + '입력 폼의 상태들을 초기화시키는 함수를 수행하는데, 이 경우', () => {
    beforeEach(async () => {
      await postFormStore.createPost();
    });

    it('입력 폼의 모든 상태들과 에러 상태들을 초기화', () => {
      postFormStore.clearStates();

      expect(postFormStore.gameExercise).toBeFalsy();
      expect(postFormStore.gameDate).toBeTruthy();
      expect(postFormStore.gameStartTimeAmPm).toBeFalsy();
      expect(postFormStore.gameStartHour).toBeFalsy();
      expect(postFormStore.gameStartMinute).toBeFalsy();
      expect(postFormStore.gameEndTimeAmPm).toBeFalsy();
      expect(postFormStore.gameEndHour).toBeFalsy();
      expect(postFormStore.gameEndMinute).toBeFalsy();
      expect(postFormStore.placeName).toBeFalsy();
      expect(postFormStore.placeAddress).toBeFalsy();
      expect(postFormStore.gameTargetMemberCount).toBeFalsy();
      expect(postFormStore.postDetail).toBeFalsy();
      Object.entries(postFormStore.formErrors).forEach((error) => {
        expect(error[1]).toBeFalsy();
      });
    });

    context('서버에서 에러가 발생해 서버 에러 상태가 저장된 상태에서도'
      + '입력 폼의 상태들을 초기화시키는 함수가 수행되면', () => {
      beforeEach(async () => {
        postFormStore.gameExercise = '스케이트';
        postFormStore.gameDate = new Date('2022-12-31T00:00:00.000Z');
        postFormStore.gameStartTimeAmPm = 'am';
        postFormStore.gameStartHour = '10';
        postFormStore.gameStartMinute = '00';
        postFormStore.gameEndTimeAmPm = 'pm';
        postFormStore.gameEndHour = '04';
        postFormStore.gameEndMinute = '30';
        postFormStore.placeName = '서버 에러가 발생하는 장소 이름';
        postFormStore.placeAddress = '서버 에러가 발생하는 장소 주소';
        postFormStore.isRegisteredPlace = true;
        postFormStore.gameTargetMemberCount = '12';
        postFormStore.postDetail = '스케이트 입문자 모집!';
        await postFormStore.createPost();
      });

      it('입력 폼의 서버 에러 상태도 초기화', () => {
        postFormStore.clearStates();

        expect(postFormStore.serverError).toBeFalsy();
      });
    });
  });
});
