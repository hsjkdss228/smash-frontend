/* eslint-disable class-methods-use-this */

import { postApiService } from '../services/PostApiService';

export default class PostStore {
  constructor() {
    // Posts
    this.posts = [];

    // Post
    this.postInformation = {};
    this.postPositions = {};

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
    this.posts = data.posts;
    this.publish();
  }

  async fetchPost(postId) {
    const data = await postApiService.fetchPost(postId);
    this.makePost(data);
    this.publish();
  }

  makePost(data) {
    const post = data;
    const { game } = post;

    this.postInformation = {
      exerciseDate: game.exerciseDate,
      placeName: game.place,
      hits: post.hits,
      exercise: game.exercise,
      postType: post.type,
      averageMannerScore: this.calculateAverageMannerScore(game.teams),
      author: post.author,
      createdAt: post.createdAt,
      detail: post.detail,
      images: post.images,
      exerciseType: game.exerciseType,
      exerciseLevel: game.exerciseLevel,
      exerciseGender: game.exerciseGender,
      currentTotalParticipants: this.countCurrentTotalParticipants(game.teams),
      targetTotalParticipantsCount: this.countTargetTotalParticipants(game.teams),
      cost: game.cost,
    };

    this.postPositions = {
      userStatus: game.userStatus,
      roleIdOfAccessedUser: game.roleIdOfAccessedUser,
      teams: game.teams.map((team) => ({
        id: team.id,
        name: team.name,
        membersCount: team.membersCount,
        targetMembersCount: team.targetMembersCount,
        roles: team.roles.filter((role) => role.teamId === team.id)
          .map((foundRole) => ({
            id: foundRole.id,
            teamId: foundRole.teamId,
            name: foundRole.name,
            currentParticipants: foundRole.currentParticipants,
            targetParticipantsCount: foundRole.targetParticipantsCount,
            members: foundRole.members.filter((member) => member.roleId === foundRole.id)
              .map((foundMember) => ({
                id: foundMember.id,
                roleId: foundMember.roleId,
                name: foundMember.name,
                mannerScore: foundMember.mannerScore,
              })),
          })),
      })),
    };
  }

  calculateAverageMannerScore(teams) {
    const roles = teams.map((team) => team.roles);
    const destructuredRoles = [];
    roles.forEach((role) => destructuredRoles.push(...role));

    const members = destructuredRoles.map((role) => role.members);
    const destructuredMembers = [];
    members.forEach((member) => destructuredMembers.push(...member));

    const mannerScoreSum = destructuredMembers.reduce((accumulator, member) => (
      accumulator + member.mannerScore
    ), 0);

    return mannerScoreSum / destructuredMembers.length;
  }

  countCurrentTotalParticipants(teams) {
    return teams.reduce((count, team) => (
      count + team.membersCount
    ), 0);
  }

  countTargetTotalParticipants(teams) {
    return teams.reduce((count, team) => (
      count + team.targetMembersCount
    ), 0);
  }
}

export const postStore = new PostStore();
