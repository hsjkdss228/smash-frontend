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
    const fetchedMembers = data.members;
    const fetchedPlaces = data.places;

    this.posts = Array(fetchedPosts.length).fill({}).map((_, index) => {
      const post = fetchedPosts[index];
      const foundTeam = fetchedTeams.find((team) => (
        team.postId === post.id
      ));
      const foundPositions = fetchedPositions.filter((position) => (
        position.teamId === foundTeam.id
      ));
      const foundMembers = fetchedMembers.filter((member) => (
        member.teamId === foundTeam.id
      ));
      const foundPlace = fetchedPlaces.find((place) => (
        place.teamId === foundTeam.id
      ));

      return {
        id: post.id,
        postType: post.postType,
        author: post.author,
        createdAt: post.createdAt,
        hits: post.hits,
        thumbnailImageUrl: post.images.map((image) => image.isThumbnail),
        exercise: foundTeam.exercise,
        exerciseDate: foundTeam.exerciseDate,
        exerciseType: foundTeam.exerciseType,
        exerciseLevel: foundTeam.exerciseLevel,
        exerciseGender: foundTeam.exerciseGender,
        averageMannerScore: foundMembers.reduce((average, member, foundMemberIndex, array) => (
          foundMemberIndex === array.length
            ? average / index + 1
            : average + member.mannerScore
        ), 0),
        cost: foundTeam.cost,
        membersCount: foundTeam.membersCount,
        targetMembersCount: foundTeam.targetMembersCount,
        positions: foundPositions.map((position) => ({
          id: position.id,
          name: position.name,
          currentParticipants: position.currentParticipants,
          targetParticipantsCount: position.targetParticipantsCount,
        })),
        place: foundPlace.name,
      };
    });
  }
}

export const postStore = new PostStore();
