import { postApiService } from '../services/PostApiService';

export default class PostStoreBackup {
  constructor() {
    // Posts
    this.posts = [];

    // Post
    this.information = [];
    this.teamsAndPositions = [];

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
    this.makePostThumbnailList(data);
    this.publish();
  }

  makePostThumbnailList(data) {
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
        place.postId === post.id
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
        averageMannerScore: this.calculateAverageMannerScore(foundMembers),
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

  async fetchPost(postId) {
    const data = await postApiService.fetchPost(postId);
    this.makePostInformations(data);
    this.makePostTeamsAndPositions(data);
    this.publish();
  }

  makePostInformations(data) {
    // TODO: 추후 운동 모델을 따로 뺄 경우 설정하는 로직도 바뀌어야 함

    const fetchedPost = data.post;
    const fetchedTeams = data.teams;
    const fetchedMembers = data.members;
    const fetchedPlace = data.place;

    const countCurrentTotalParticipants = () => fetchedTeams.reduce((count, team) => (
      count + team.membersCount
    ), 0);
    const countTargetTotalParticipants = () => fetchedTeams.reduce((count, team) => (
      count + team.targetMembersCount
    ), 0);

    this.information = {
      postId: fetchedPost.id,
      exerciseDate: fetchedTeams[0].exerciseDate,
      placeName: fetchedPlace.name,
      hits: fetchedPost.hits,
      exercise: fetchedTeams[0].exercise,
      postType: fetchedPost.postType,
      averageMannerScore: this.calculateAverageMannerScore(fetchedMembers),
      author: fetchedPost.author,
      createdAt: fetchedPost.createdAt,
      detail: fetchedPost.detail,
      images: fetchedPost.images,
      exerciseType: fetchedTeams[0].exerciseType,
      exerciseLevel: fetchedTeams[0].exerciseLevel,
      exerciseGender: fetchedTeams[0].male,
      currentTotalParticipants: countCurrentTotalParticipants(),
      targetTotalParticipantsCount: countTargetTotalParticipants,
      cost: fetchedTeams.cost,
    };
  }

  calculateAverageMannerScore(members) {
    const mannerScoreSum = members.reduce((accumulator, member) => (
      accumulator + member.mannerScore
    ), 0);
    return mannerScoreSum / members.length;
  }

  makePostTeamsAndPositions(data) {
    const fetchedTeams = data.teams;
    const fetchedPositions = data.positions;
    const fetchedMembers = data.members;

    this.teamsAndPositions = Array(fetchedTeams.length).fill({}).map((_, index) => {
      const foundTeam = fetchedTeams[index];

      return {
        id: foundTeam.id,
        name: foundTeam.name,
        membersCount: foundTeam.membersCount,
        targetMembersCount: foundTeam.targetMembersCount,
        positions: fetchedPositions.filter((position) => position.teamId === foundTeam.id)
          .map((foundPosition) => ({
            id: foundPosition.id,
            teamId: foundPosition.teamId,
            name: foundPosition.name,
            currentParticipants: foundPosition.currentParticipants,
            targetParticipantsCount: foundPosition.targetParticipantsCount,
            members: fetchedMembers.filter((member) => member.positionId === foundPosition.id)
              .map((foundMember) => ({
                id: foundMember.id,
                positionId: foundMember.positionId,
                name: foundMember.name,
                mannerScore: foundMember.mannerScore,
              })),
          })),
      };
    });
  }
}z;
