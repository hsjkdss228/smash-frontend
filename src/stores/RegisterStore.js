/* eslint-disable class-methods-use-this */

import { registerApiService } from '../services/RegisterApiService';
import Store from './Store';

export default class RegisterStore extends Store {
  constructor() {
    super();

    this.registeredGameId = -1;
    this.registerServerError = '';

    this.members = [];
    this.membersServerError = '';

    this.applicants = [];
    this.applicantsServerError = '';

    this.changeRegisterServerError = '';
  }

  async fetchMembers(gameId) {
    try {
      const data = await registerApiService.fetchMembers(gameId);
      this.members = data.members;
      this.publish();
    } catch (error) {
      this.membersServerError = error.response.data;
      this.publish();
    }
  }

  async fetchApplicants(gameId) {
    try {
      const data = await registerApiService.fetchApplicants(gameId);
      this.applicants = data.applicants;
      this.publish();
    } catch (error) {
      this.applicantsServerError = error.response.data;
      this.publish();
    }
  }

  async registerGame(gameId) {
    try {
      this.registeredGameId = await registerApiService.registerGame(gameId);
      return this.registeredGameId;
    } catch (error) {
      const errorMessage = error.response.data;

      this.registerServerError = '알 수 없는 에러입니다.';
      if (errorMessage === 'User Not Found') {
        this.registerServerError = '사용자를 찾을 수 없습니다.';
      }
      if (errorMessage === 'Game Not Found') {
        this.registerServerError = '등록된 경기를 찾을 수 없습니다.';
      }
      if (errorMessage === 'Already Joined Game') {
        this.registerServerError = '이미 참가 신청 중이거나, 참가 신청이 완료된 경기입니다.';
      }
      if (errorMessage === 'Game Is Full') {
        this.registerServerError = '정원이 모두 차 참가를 신청할 수 없습니다.';
      }
      if (errorMessage === 'Post Not Found') {
        this.registerServerError = '경기가 등록된 게시물을 찾을 수 없습니다.';
      }

      this.publish();
      return '';
    }
  }

  async cancelRegisterGame(registerId) {
    try {
      await registerApiService.cancelRegisterGame(registerId);
    } catch (error) {
      const errorMessage = error.response.data;

      this.changeRegisterServerError = '알 수 없는 에러입니다.';
      if (errorMessage === 'Register Not Found') {
        this.changeRegisterServerError = '등록된 신청 상태를 찾을 수 없습니다.';
      }
      if (errorMessage === 'Is Not Register Of Current User') {
        this.changeRegisterServerError = '신청 상태가 접속한 사용자의 신청 상태가 아닙니다.';
      }

      this.publish();
    }
  }

  async cancelParticipateGame(registerId) {
    try {
      await registerApiService.cancelParticipateGame(registerId);
    } catch (error) {
      const errorMessage = error.response.data;

      this.changeRegisterServerError = '알 수 없는 에러입니다.';
      if (errorMessage === 'Register Not Found') {
        this.changeRegisterServerError = '등록된 신청 상태를 찾을 수 없습니다.';
      }
      if (errorMessage === 'Is Not Register Of Current User') {
        this.changeRegisterServerError = '신청 상태가 접속한 사용자의 신청 상태가 아닙니다.';
      }

      this.publish();
    }
  }

  async acceptRegister(registerId) {
    try {
      await registerApiService.acceptRegister(registerId);
    } catch (error) {
      const errorMessage = error.response.data;

      this.changeRegisterServerError = '알 수 없는 에러입니다.';
      if (errorMessage === 'Register Not Found') {
        this.changeRegisterServerError = '등록된 신청 상태를 찾을 수 없습니다.';
      }
      if (errorMessage === 'Game Not Found') {
        this.changeRegisterServerError = '등록된 경기를 찾을 수 없습니다.';
      }
      if (errorMessage === 'Game Is Full') {
        this.changeRegisterServerError = '정원이 모두 차 참가를 신청할 수 없습니다.';
      }
      if (errorMessage === 'User Not Found') {
        this.changeRegisterServerError = '사용자를 찾을 수 없습니다.';
      }

      this.publish();
    }
  }

  async rejectRegister(registerId) {
    try {
      await registerApiService.rejectRegister(registerId);
    } catch (error) {
      const errorMessage = error.response.data;

      this.changeRegisterServerError = '알 수 없는 에러입니다.';
      if (errorMessage === 'Register Not Found') {
        this.changeRegisterServerError = '등록된 신청 상태를 찾을 수 없습니다.';
      }

      this.publish();
    }
  }
}

export const registerStore = new RegisterStore();
