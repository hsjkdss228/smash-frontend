/* eslint-disable class-methods-use-this */

import axios from 'axios';

import config from '../config';

const { apiBaseUrl } = config;

export default class PlaceApiService {
  async fetchPlace(placeId) {
    const url = `${apiBaseUrl}/places/${placeId}`;
    const { data } = await axios.get(url);
    return data;
  }

  async searchPlace(placeNameSearching) {
    const url = `${apiBaseUrl}/places/search`;
    const { data } = await axios.get(url, {
      params: {
        keyword: placeNameSearching,
      },
    });
    return data;
  }
}

export const placeApiService = new PlaceApiService();
