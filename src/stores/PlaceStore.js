import { placeApiService } from '../services/PlaceApiService';
import Store from './Store';

export default class PlaceStore extends Store {
  constructor() {
    super();

    this.place = {};
    this.placeServerError = '';
  }

  async fetchPlace(placeId) {
    try {
      const data = await placeApiService.fetchPlace(placeId);
      this.place = data;
      this.publish();
    } catch (error) {
      const { errorMessage } = error.response.data;
      this.placeServerError = errorMessage;
      this.publish();
    }
  }
}

export const placeStore = new PlaceStore();
