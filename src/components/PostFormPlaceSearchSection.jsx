/* eslint-disable no-nested-ternary */

import { useEffect } from 'react';
import styled from 'styled-components';
import usePostFormStore from '../hooks/usePostFormStore';

const HiddenLabel = styled.label`
  display: none;
`;

const PlaceSearchingInput = styled.input`
  width: 100%;
  font-size: .9em;
  padding: .7em;
  border: 1px solid #D8D8D8;
  margin-bottom: .3em;

  :focus {
    outline: none;
  }

  ::placeholder {
    font-size: .8em;
    color: #C0C0C0;
  }
`;

const PlaceResults = styled.ul`
  height: 6em;
  width: 100%;
  padding: 1.2em .7em;
  border: 1px solid #D8D8D8;
  margin-bottom: .3em;
  overflow: scroll;

  button {
    font-size: .9em;
  }

  button:hover {
    cursor: pointer;
  }

  p {
    font-size: .7em;
  }

  p:hover {
    cursor: default;
  }
`;

export default function PostFormPlaceSearchSection() {
  const postFormStore = usePostFormStore();

  const {
    searchPlaceMode,
    placeNameSearching,
    searchedPlaces,
  } = postFormStore;

  const clearSearchTimer = () => {
    clearTimeout(postFormStore.placeSearchTimerId);
    postFormStore.placeSearchTimerId = '';
  };

  useEffect(() => {
    if (placeNameSearching) {
      postFormStore.placeSearchTimerId = setTimeout(() => {
        postFormStore.searchPlace();
      }, 1000);
    }

    return () => clearSearchTimer();
  }, [placeNameSearching]);

  const handleChangePlaceNameSearching = (event) => {
    clearTimeout(postFormStore.placeSearchTimerId);
    const { value } = event.target;
    postFormStore.changePlaceNameSearching(value);
  };

  const handleClickSelectPlace = (index) => {
    postFormStore.selectPlace(index);
  };

  if (!searchPlaceMode) {
    return (
      null
    );
  }

  return (
    <>
      <HiddenLabel htmlFor="input-place-name-searching">
        장소 이름 검색
      </HiddenLabel>
      <PlaceSearchingInput
        id="input-place-name-searching"
        type="text"
        placeholder="장소 이름 검색"
        value={placeNameSearching}
        onChange={handleChangePlaceNameSearching}
      />
      <PlaceResults>
        {!searchedPlaces ? (
          null
        ) : searchedPlaces.length === 0 ? (
          <p>검색된 장소가 없습니다.</p>
        ) : (
          searchedPlaces.map((searchedPlace, index) => (
            <li key={searchedPlace.id}>
              <button
                type="button"
                onClick={() => handleClickSelectPlace(index)}
              >
                {searchedPlace.name}
              </button>
            </li>
          ))
        )}
      </PlaceResults>
    </>
  );
}
