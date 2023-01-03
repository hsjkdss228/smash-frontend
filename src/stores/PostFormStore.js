/* eslint-disable class-methods-use-this */

import Store from './Store';

import { postApiService } from '../services/PostApiService';

const timeInputCheck = /^[\d]*$/;
const dateOffset = 1000 * 60 * 60 * 9;

export default class PostFormStore extends Store {
  constructor() {
    super();

    this.gameExercise = '';
    this.gameDate = new Date();
    this.gameStartTimeAmPm = '';
    this.gameStartHour = '';
    this.gameStartMinute = '';
    this.gameEndTimeAmPm = '';
    this.gameEndHour = '';
    this.gameEndMinute = '';
    this.placeName = '';
    this.gameTargetMemberCount = 0;
    this.postDetail = '';

    this.formErrors = {
      BLANK_GAME_EXERCISE: '',
      BLANK_GAME_DATE: '',
      BLANK_GAME_START_AM_PM: '',
      BLANK_GAME_START_HOUR: '',
      BLANK_GAME_START_MINUTE: '',
      BLANK_GAME_END_AM_PM: '',
      BLANK_GAME_END_HOUR: '',
      BLANK_GAME_END_MINUTE: '',
      BLANK_PLACE_NAME: '',
      NULL_GAME_TARGET_MEMBER_COUNT: '',
      BLANK_POST_DETAIL: '',
    };
    this.hasFormErrors = false;

    this.serverError = '';
  }

  changeGameExercise(exercise) {
    this.formErrors.BLANK_GAME_EXERCISE = '';
    this.gameExercise = exercise;
    this.publish();
  }

  changeGameDate(date) {
    this.formErrors.BLANK_GAME_DATE = '';
    this.gameDate = date;
    this.publish();
  }

  changeGameStartTimeAmPm(startTimeAmPm) {
    this.formErrors.BLANK_GAME_START_AM_PM = '';
    this.gameStartTimeAmPm = startTimeAmPm;
    this.publish();
  }

  changeGameStartHour(startHour) {
    this.formErrors.BLANK_GAME_START_HOUR = '';
    if (startHour.toString().length === 0
      || !timeInputCheck.test(startHour.toString())) {
      this.gameStartHour = '';
      this.publish();
      return;
    }
    if (startHour < 1) {
      this.gameStartHour = 1;
      this.publish();
      return;
    }
    if (startHour > 12 || startHour.toString().length >= 3) {
      this.gameStartHour = 12;
      this.publish();
      return;
    }
    this.gameStartHour = startHour;
    this.publish();
  }

  changeGameStartMinute(startMinute) {
    this.formErrors.BLANK_GAME_START_MINUTE = '';
    if (startMinute.toString().length === 0
      || !timeInputCheck.test(startMinute)) {
      this.gameStartMinute = '';
      this.publish();
      return;
    }
    if (startMinute < 0) {
      this.gameStartMinute = 0;
      this.publish();
      return;
    }
    if (startMinute > 59 || startMinute.toString().length >= 3) {
      this.gameStartMinute = 59;
      this.publish();
      return;
    }
    this.gameStartMinute = startMinute;
    this.publish();
  }

  changeGameEndTimeAmPm(endTimeAmPm) {
    this.formErrors.BLANK_GAME_END_AM_PM = '';
    this.gameEndTimeAmPm = endTimeAmPm;
    this.publish();
  }

  changeGameEndHour(endHour) {
    this.formErrors.BLANK_GAME_END_HOUR = '';
    if (endHour.toString().length === 0
      || !timeInputCheck.test(endHour.toString())) {
      this.gameEndHour = '';
      this.publish();
      return;
    }
    if (endHour < 1) {
      this.gameEndHour = 1;
      this.publish();
      return;
    }
    if (endHour > 12 || endHour.toString().length >= 3) {
      this.gameEndHour = 12;
      this.publish();
      return;
    }
    this.gameEndHour = endHour;
    this.publish();
  }

  changeGameEndMinute(endMinute) {
    this.formErrors.BLANK_GAME_END_MINUTE = '';
    if (endMinute.toString().length === 0
      || !timeInputCheck.test(endMinute.toString())) {
      this.gameEndMinute = '';
      this.publish();
      return;
    }
    if (endMinute < 0) {
      this.gameEndMinute = 0;
      this.publish();
      return;
    }
    if (endMinute > 59 || endMinute.toString().length >= 3) {
      this.gameEndMinute = 59;
      this.publish();
      return;
    }
    this.gameEndMinute = endMinute;
    this.publish();
  }

  changePlaceName(place) {
    this.formErrors.BLANK_PLACE_NAME = '';
    this.clearServerError();
    this.placeName = place;
    this.publish();
  }

  changeGameTargetMemberCount(targetMemberCount) {
    this.formErrors.NULL_GAME_TARGET_MEMBER_COUNT = '';
    this.gameTargetMemberCount = targetMemberCount;
    this.publish();
  }

  changePostDetail(detail) {
    this.formErrors.BLANK_POST_DETAIL = '';
    this.postDetail = detail;
    this.publish();
  }

  async createPost() {
    try {
      this.clearFormErrors();

      if (this.gameExercise === '') {
        this.formErrors
          .BLANK_GAME_EXERCISE = '종목을 입력하지 않았습니다.';
        this.hasFormErrors = true;
      }
      if (this.gameDate === '') {
        this.formErrors
          .BLANK_GAME_DATE = '날짜 및 시간을 입력하지 않았습니다.';
        this.hasFormErrors = true;
      }
      if (this.gameStartTimeAmPm === '') {
        this.formErrors
          .BLANK_GAME_START_AM_PM = '날짜 및 시간을 입력하지 않았습니다.';
        this.hasFormErrors = true;
      }
      if (this.gameStartHour === '') {
        this.formErrors
          .BLANK_GAME_START_HOUR = '날짜 및 시간을 입력하지 않았습니다.';
        this.hasFormErrors = true;
      }
      if (this.gameStartMinute === '') {
        this.formErrors
          .BLANK_GAME_START_MINUTE = '날짜 및 시간을 입력하지 않았습니다.';
        this.hasFormErrors = true;
      }
      if (this.gameEndTimeAmPm === '') {
        this.formErrors
          .BLANK_GAME_END_AM_PM = '날짜 및 시간을 입력하지 않았습니다.';
        this.hasFormErrors = true;
      }
      if (this.gameEndHour === '') {
        this.formErrors
          .BLANK_GAME_END_HOUR = '날짜 및 시간을 입력하지 않았습니다.';
        this.hasFormErrors = true;
      }
      if (this.gameEndMinute === '') {
        this.formErrors
          .BLANK_GAME_END_MINUTE = '날짜 및 시간을 입력하지 않았습니다.';
        this.hasFormErrors = true;
      }
      if (this.placeName === '') {
        this.formErrors
          .BLANK_PLACE_NAME = '장소를 입력하지 않았습니다.';
        this.hasFormErrors = true;
      }
      if (this.gameTargetMemberCount === ''
        || this.gameTargetMemberCount <= 0) {
        this.formErrors
          .NULL_GAME_TARGET_MEMBER_COUNT = '모집 인원 수를 입력하지 않았습니다.';
        this.hasFormErrors = true;
      }
      if (this.postDetail === '') {
        this.formErrors
          .BLANK_POST_DETAIL = '상세 내용을 입력하지 않았습니다.';
        this.hasFormErrors = true;
      }

      if (this.hasFormErrors) {
        this.publish();
        return '';
      }

      const post = {
        detail: this.postDetail,
      };
      const game = {
        date: (new Date(this.gameDate.getTime() + dateOffset)).toISOString(),
        startTimeAmPm: this.gameStartTimeAmPm,
        startHour: this.gameStartHour,
        startMinute: this.gameStartMinute,
        endTimeAmPm: this.gameEndTimeAmPm,
        endHour: this.gameEndHour,
        endMinute: this.gameEndMinute,
        targetMemberCount: this.gameTargetMemberCount,
      };
      const exercise = {
        name: this.gameExercise,
      };
      const place = {
        name: this.placeName,
      };

      const data = await postApiService.createPost({
        post,
        game,
        exercise,
        place,
      });
      return data.postId;
    } catch (error) {
      this.serverError = error.response.data;
      this.publish();
      return '';
    }
  }

  clearFormErrors() {
    this.formErrors = {
      BLANK_GAME_EXERCISE: '',
      BLANK_GAME_DATE: '',
      BLANK_GAME_START_AM_PM: '',
      BLANK_GAME_START_HOUR: '',
      BLANK_GAME_START_MINUTE: '',
      BLANK_GAME_END_AM_PM: '',
      BLANK_GAME_END_HOUR: '',
      BLANK_GAME_END_MINUTE: '',
      BLANK_PLACE_NAME: '',
      NULL_GAME_TARGET_MEMBER_COUNT: '',
      BLANK_POST_DETAIL: '',
    };
    this.hasFormErrors = false;
  }

  clearServerError() {
    this.serverError = '';
  }

  clearStates() {
    this.gameExercise = '';
    this.gameDate = new Date();
    this.gameStartTimeAmPm = '';
    this.gameStartHour = '';
    this.gameStartMinute = '';
    this.gameEndTimeAmPm = '';
    this.gameEndHour = '';
    this.gameEndMinute = '';
    this.placeName = '';
    this.gameTargetMemberCount = '';
    this.postDetail = '';
    this.clearFormErrors();
    this.serverError = '';

    this.publish();
  }
}

export const postFormStore = new PostFormStore();
