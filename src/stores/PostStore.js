/* eslint-disable class-methods-use-this */

import { postApiService } from '../services/PostApiService';

export default class PostStore {
  constructor() {
    this.posts = [];
    this.images = [];
    this.games = [];
    this.places = [];
    this.roles = [];

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
    this.posts = await postApiService.fetchPosts();
    this.publish();
  }

  async fetchImages() {
    this.images = await postApiService.fetchImages();
    this.publish();
  }

  async fetchGames() {
    this.games = await postApiService.fetchGames();
    this.publish();
  }

  async fetchPlaces() {
    this.places = await postApiService.fetchPlaces();
    this.publish();
  }

  async fetchRoles() {
    this.roles = await postApiService.fetchRoles();
    this.publish();
  }
}

export const postStore = new PostStore();
