import context from 'jest-plugin-context';
import PlaceStore from './PlaceStore';

let placeStore;

describe('PlaceStore', () => {
  beforeEach(() => {
    placeStore = new PlaceStore();
  });

  context('서버에 특정 경기의 장소 정보를 요청하는 API를 호출하면', () => {
    context('정상적인 장소 id로 요청했을 경우', () => {
      const placeId = 1;

      it('서버에서 응답으로 전달된 장소 정보를 상태로 저장', async () => {
        await placeStore.fetchPlace(placeId);

        const { place, placeServerError } = placeStore;
        expect(Object.keys(place).length).toBe(5);
        expect(placeServerError).toBeFalsy();
      });
    });

    context('요청한 id에 해당하는 장소가 존재하지 않는 오류가 있을 경우', () => {
      const wrongPlaceId = 4444;

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장', async () => {
        await placeStore.fetchPlace(wrongPlaceId);

        const { place, placeServerError } = placeStore;
        expect(Object.keys(place).length).toBe(0);
        expect(placeServerError).toBe('Place Not Found');
      });
    });
  });
});
