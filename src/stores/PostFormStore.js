/* eslint-disable class-methods-use-this */

import Store from './Store';

import { postApiService } from '../services/PostApiService';

export default class PostFormStore extends Store {
  constructor() {
    super();

    this.gameExercise = '';
    this.gameDate = new Date();
    this.gameStartHour = '';
    this.gameStartMinute = '';
    this.gameEndHour = '';
    this.gameEndMinute = '';
    this.gamePlace = '';
    this.gameTargetMemberCount = '';
    this.postDetail = '';

    this.createPostErrorMessage = '';
  }

  changeGameExercise(exercise) {
    this.gameExercise = exercise;
    this.publish();
  }

  changeGameDate(date) {
    this.gameDate = date;
    this.publish();
  }

  changeGameStartHour(startHour) {
    this.gameStartHour = startHour;
    this.publish();
  }

  changeGameStartMinute(endHour) {
    this.gameStartMinute = endHour;
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
      const gameTime = `${this.gameStartHour},${this.gameStartMinute},${this.gameEndHour},${this.gameEndMinute}`;
      const data = await postApiService.createPost({
        gameExercise: this.gameExercise,
        gameDate: this.gameDate.toISOString(),
        gameTime,
        gamePlace: this.gamePlace,
        gameTargetMemberCount: this.gameTargetMemberCount,
        postDetail: this.postDetail,
      });
      return data.postId;
    } catch (error) {
      const { errorMessage } = error.response.data;
      this.createPostErrorMessage = errorMessage;
      return '';
    }
  }

  clearStates() {
    this.gameExercise = '';
    this.gameDate = new Date();
    this.gameStartHour = '';
    this.gameStartMinute = '';
    this.gameEndHour = '';
    this.gameEndMinute = '';
    this.gamePlace = '';
    this.gameTargetMemberCount = '';
    this.postDetail = '';
  }
}

export const postFormStore = new PostFormStore();
