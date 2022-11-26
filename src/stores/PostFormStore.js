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
    this.gameTargetMemberCount = '';
    this.postDetail = '';

    this.errorCodeAndMessages = {};
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
      const { errorCodeAndMessages } = error.response.data;
      this.errorCodeAndMessages = errorCodeAndMessages;
      this.publish();
      return '';
    }
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
    this.errorCodeAndMessages = {};

    this.publish();
  }
}

export const postFormStore = new PostFormStore();
