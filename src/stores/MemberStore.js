import { memberApiService } from '../services/MemberApiService';

export default class MemberStore {
  constructor() {
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);
  }

  publish() {
    this.listeners.forEach((listener) => listener());
  }

  async register({ gameId, teamId, roleId }) {
    try {
      await memberApiService.register({ gameId, teamId, roleId });
      this.publish();
    } catch (error) {
      this.publish();
    }
  }

  async cancelRegister(roleId) {
    try {
      await memberApiService.cancelRegister(roleId);
      this.publish();
    } catch (error) {
      this.publish();
    }
  }
}

export const memberStore = new MemberStore();
