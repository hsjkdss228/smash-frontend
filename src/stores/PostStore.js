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

    this.deletePostServerError = '';
  }

  // TODO: 내가 참가하는 운동, 내가 작성한 운동 조회를 위한
  //   적용하기 버튼 추가하기

  resetSearchConditionState() {
    this.exerciseSelection = false;
    this.placeSelection = false;
    this.authorSelection = false;
    this.memberSelection = false;
    this.applicantSelection = false;
  }

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
      const errorMessage = error.response.data;

      this.postsServerError = '알 수 없는 에러입니다.';
      if (errorMessage === 'User Not Found') {
        this.postsServerError = '사용자를 찾을 수 없습니다.';
      }
      if (errorMessage === 'Game Not Found') {
        this.postsServerError = '경기를 찾을 수 없습니다.';
      }
      if (errorMessage === 'Place Not Found') {
        this.postsServerError = '운동 장소를 찾을 수 없습니다.';
      }

      this.publish();
    }
  }

  async fetchPost(postId) {
    try {
      const data = await postApiService.fetchPost(postId);
      this.post = data;
    } catch (error) {
      const errorMessage = error.response.data;

      this.postServerError = '알 수 없는 에러입니다.';
      if (errorMessage === 'Post Not Found') {
        this.postServerError = '게시글을 찾을 수 없습니다.';
      }
      if (errorMessage === 'User Not Found') {
        this.postServerError = '사용자를 찾을 수 없습니다.';
      }

      this.publish();
    }
  }

  // TODO: 게시글을 생성하는 POST 요청이 PostFormStore에서 여기로 옮겨와져야 함

  async deletePost(postId) {
    try {
      await postApiService.deletePost(postId);
    } catch (error) {
      const errorMessage = error.response.data;

      this.deletePostServerError = '알 수 없는 에러입니다.';
      if (errorMessage === 'Post Not Found') {
        this.deletePostServerError = '게시글을 찾을 수 없습니다.';
      }
      if (errorMessage === 'User Is Not Author') {
        this.deletePostServerError = '접속한 사용자가 작성자가 아닙니다.';
      }
      if (errorMessage === 'Game Not Found') {
        this.deletePostServerError = '경기를 찾을 수 없습니다.';
      }

      this.publish();
    }
  }
}

export const postStore = new PostStore();
