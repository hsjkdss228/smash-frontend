import { postApiService } from '../services/PostApiService';

export default class PostStore {
  constructor() {
    this.posts = [];

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

  async fetchPosts() {
    const data = await postApiService.fetchPosts();
    this.makePostsList(data);
    this.publish();
  }

  makePostsList(data) {
    const fetchedPosts = data.posts;
    const fetchedTeams = data.teams;
    const fetchedPositions = data.positions;

    this.posts = Array(fetchedPosts.length).fill({}).map((_, index) => {
      const post = fetchedPosts[index];
      const foundTeam = fetchedTeams.find((team) => (
        team.postId === post.id
      ));
      const foundPositions = fetchedPositions.filter((position) => (
        position.teamId === foundTeam.id
      ));

      return {
        id: post.id,
        author: post.author,
        detail: post.detail,
        membersCount: foundTeam.membersCount,
        targetMembersCount: foundTeam.targetMembersCount,
        positions: foundPositions.map((position) => ({
          id: position.id,
          name: position.name,
          currentParticipants: position.currentParticipants,
          targetParticipantsCount: position.targetParticipantsCount,
        })),
      };
    });
  }
}

export const postStore = new PostStore();
