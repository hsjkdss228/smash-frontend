import context from 'jest-plugin-context';
import PlaceStore from './PlaceStore';

import { placeApiService } from '../services/PlaceApiService';

describe('PlaceStore', () => {
  const placeStore = new PlaceStore();

  context('API 서버에 경기의 장소 데이터를 요청할 경우', () => {
    const placeId = 1;

    it('응답으로 받아온 place를 상태로 저장', async () => {
      placeApiService.setAccessToken('userId 1');
      await placeStore.fetchPlace(placeId);

      const { place, placeServerError } = placeStore;

      expect(Object.keys(place).length).toBe(5);
      expect(placeServerError).toBeFalsy();
    });
  });
});
