/* eslint-disable class-methods-use-this */

import Store from './Store';

import { postApiService } from '../services/PostApiService';

export default class PostStore extends Store {
  constructor() {
    super();

    this.searchKeyword = '';

    this.exerciseSelection = false;
    this.placeSelection = false;
    this.authorSelection = false;
    this.memberSelection = false;
    this.applicantSelection = false;

    this.registeredSelection = false;
    this.writtenSelection = false;

    this.posts = [];
    this.postsServerError = '';

    this.post = {};
    this.postServerError = '';
  }

  resetSearchConditionState() {
    this.exerciseSelection = false;
    this.placeSelection = false;
    this.authorSelection = false;
    this.memberSelection = false;
    this.applicantSelection = false;
  }

  // TODO: 내가 참가하는 운동, 내가 작성한 운동 조회는
  //   선택 시 바로 filtering에 들어갈 수 있을 것 같음

  resetLookUpConditionState() {
    this.registeredSelection = false;
    this.writtenSelection = false;
  }

  changeExerciseSelection() {
    this.resetLookUpConditionState();
    this.exerciseSelection = !this.exerciseSelection;
    this.publish();
  }

  changePlaceSelection() {
    this.resetLookUpConditionState();
    this.placeSelection = !this.placeSelection;
    this.publish();
  }

  changeAuthorSelection() {
    this.resetLookUpConditionState();
    this.authorSelection = !this.authorSelection;
    this.publish();
  }

  changeMemberSelection() {
    this.resetLookUpConditionState();
    this.memberSelection = !this.memberSelection;
    this.publish();
  }

  changeApplicantSelection() {
    this.resetLookUpConditionState();
    this.applicantSelection = !this.applicantSelection;
    this.publish();
  }

  setRegisteredSelection() {
    this.resetSearchConditionState();
    this.registeredSelection = !this.registeredSelection;
    this.writtenSelection = false;
    this.publish();
  }

  setWrittenSelection() {
    this.resetSearchConditionState();
    this.registeredSelection = false;
    this.writtenSelection = !this.writtenSelection;
    this.publish();
  }

  async fetchPosts() {
    try {
      const data = await postApiService.fetchPosts();
      this.posts = data.posts;
      this.publish();
    } catch (error) {
      this.postsServerError = error.response.data;
      this.publish();
    }
  }

  async fetchPost(postId) {
    try {
      const data = await postApiService.fetchPost(postId);
      this.post = data;
    } catch (error) {
      this.postServerError = error.response.data;
    }
  }

  // TODO: 게시글을 생성하는 POST 요청이 PostFormStore에서 여기로 옮겨와져야 함

  async deletePost(postId) {
    await postApiService.deletePost(postId);
  }
}

export const postStore = new PostStore();
