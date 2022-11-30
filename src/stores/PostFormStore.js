/* eslint-disable class-methods-use-this */

import Store from './Store';

import { postApiService } from '../services/PostApiService';

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
    this.gamePlace = '';
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
      BLANK_GAME_PLACE: '',
      NULL_GAME_TARGET_MEMBER_COUNT: '',
      BLANK_POST_DETAIL: '',
    };
    this.hasFormErrors = false;

    this.serverErrors = {};
  }

  changeGameExercise(exercise) {
    this.gameExercise = exercise;
    this.publish();
  }

  changeGameDate(date) {
    this.gameDate = date;
    this.publish();
  }

  changeGameStartTimeAmPm(startTimeAmPm) {
    this.gameStartTimeAmPm = startTimeAmPm;
    this.publish();
  }

  changeGameStartHour(startHour) {
    this.gameStartHour = startHour;
    this.publish();
  }

  changeGameStartMinute(startMinute) {
    this.gameStartMinute = startMinute;
    this.publish();
  }

  changeGameEndTimeAmPm(endTimeAmPm) {
    this.gameEndTimeAmPm = endTimeAmPm;
    this.publish();
  }

  changeGameEndHour(endHour) {
    this.gameEndHour = endHour;
    this.publish();
  }

  changeGameEndMinute(endMinute) {
    this.gameEndMinute = endMinute;
    this.publish();
  }

  changeGamePlace(place) {
    this.gamePlace = place;
    this.publish();
  }

  changeGameTargetMemberCount(targetMemberCount) {
    this.gameTargetMemberCount = targetMemberCount;
    this.publish();
  }

  changePostDetail(detail) {
    this.postDetail = detail;
    this.publish();
  }

  async createPost() {
    try {
      this.clearFormErrors();

      if (this.gameExercise === '') {
        this.formErrors
          .BLANK_GAME_EXERCISE = '운동을 입력해주세요';
        this.hasFormErrors = true;
      }
      if (this.gameDate === '') {
        this.formErrors
          .BLANK_GAME_DATE = '운동 날짜를 입력해주세요.';
        this.hasFormErrors = true;
      }
      if (this.gameStartTimeAmPm === '') {
        this.formErrors
          .BLANK_GAME_START_AM_PM = '시작시간 오전/오후 구분을 입력해주세요.';
        this.hasFormErrors = true;
      }
      if (this.gameStartHour === '') {
        this.formErrors
          .BLANK_GAME_START_HOUR = '시작 시간을 입력해주세요.';
        this.hasFormErrors = true;
      }
      if (this.gameStartMinute === '') {
        this.formErrors
          .BLANK_GAME_START_MINUTE = '시작 분을 입력해주세요.';
        this.hasFormErrors = true;
      }
      if (this.gameEndTimeAmPm === '') {
        this.formErrors
          .BLANK_GAME_END_AM_PM = '종료시간 오전/오후 구분을 입력해주세요.';
        this.hasFormErrors = true;
      }
      if (this.gameEndHour === '') {
        this.formErrors
          .BLANK_GAME_END_HOUR = '종료 시간을 입력해주세요.';
        this.hasFormErrors = true;
      }
      if (this.gameEndMinute === '') {
        this.formErrors
          .BLANK_GAME_END_MINUTE = '종료 분을 입력해주세요.';
        this.hasFormErrors = true;
      }
      if (this.gamePlace === '') {
        this.formErrors
          .BLANK_GAME_PLACE = '운동 장소 이름을 입력해주세요.';
        this.hasFormErrors = true;
      }
      if (this.gameTargetMemberCount === ''
        || this.gameTargetMemberCount <= 0) {
        this.formErrors
          .NULL_GAME_TARGET_MEMBER_COUNT = '사용자 수를 입력해주세요.';
        this.hasFormErrors = true;
      }
      if (this.postDetail === '') {
        this.formErrors
          .BLANK_POST_DETAIL = '게시글 상세 내용을 입력해주세요.';
        this.hasFormErrors = true;
      }

      if (this.hasFormErrors) {
        this.publish();
        return '';
      }

      const data = await postApiService.createPost({
        gameExercise: this.gameExercise,
        gameDate: this.gameDate.toISOString(),
        gameStartTimeAmPm: this.gameStartTimeAmPm,
        gameStartHour: this.gameStartHour,
        gameStartMinute: this.gameStartMinute,
        gameEndTimeAmPm: this.gameEndTimeAmPm,
        gameEndHour: this.gameEndHour,
        gameEndMinute: this.gameEndMinute,
        gamePlace: this.gamePlace,
        gameTargetMemberCount: this.gameTargetMemberCount,
        postDetail: this.postDetail,
      });
      return data.postId;
    } catch (error) {
      const { errorMessages } = error.response.data;
      this.serverErrors = errorMessages;
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
      BLANK_GAME_PLACE: '',
      NULL_GAME_TARGET_MEMBER_COUNT: '',
      BLANK_POST_DETAIL: '',
    };
    this.hasFormErrors = false;
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
    this.gamePlace = '';
    this.gameTargetMemberCount = '';
    this.postDetail = '';
    this.clearFormErrors();

    this.serverErrors = {};

    this.publish();
  }
}

export const postFormStore = new PostFormStore();
