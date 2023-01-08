/* eslint-disable no-nested-ternary */

import styled from 'styled-components';
import usePostFormStore from '../hooks/usePostFormStore';

const HiddenLabel = styled.label`
  display: none;
`;

const PlaceSelectedInput = styled.input`
  width: 100%;
  font-size: .9em;
  padding: .7em;
  border: ${({ hasError }) => (
    hasError ? '1px solid #f00' : '1px solid #D8D8D8'
  )};
  margin-bottom: .3em;

  ::placeholder {
    font-size: .8em;
    color: ${({ hasError }) => (
    hasError ? '#f00' : '#C0C0C0'
  )};
  }
`;

export default function PostFormPlaceSelectedPlaceSection() {
  const postFormStore = usePostFormStore();

  const {
    searchPlaceMode,
    inputPlaceDirectlyMode,
    placeName,
    placeAddress,
    formErrors,
    serverError,
  } = postFormStore;

  const handleChangePlaceNameDirectly = (event) => {
    const { value } = event.target;
    postFormStore.changePlaceNameDirectly(value);
  };

  const handleChangePlaceAddressDirectly = (event) => {
    const { value } = event.target;
    postFormStore.changePlaceAddressDirectly(value);
  };

  return (
    <>
      <HiddenLabel htmlFor="selected-place-name">
        장소 이름
      </HiddenLabel>
      <PlaceSelectedInput
        id="selected-place-name"
        type="text"
        placeholder={(
          formErrors.BLANK_PLACE ? (
            formErrors.BLANK_PLACE
          ) : searchPlaceMode ? (
            '선택된 장소 이름'
          ) : (
            '입력할 장소 이름'
          )
        )}
        value={placeName}
        onChange={handleChangePlaceNameDirectly}
        hasError={(
          formErrors.BLANK_PLACE
              || serverError
        )}
        disabled={!inputPlaceDirectlyMode}
      />
      <HiddenLabel htmlFor="selected-place-address">
        장소 주소
      </HiddenLabel>
      <PlaceSelectedInput
        id="selected-place-address"
        type="text"
        placeholder={(
          formErrors.BLANK_PLACE ? (
            formErrors.BLANK_PLACE
          ) : searchPlaceMode ? (
            '선택된 장소 주소'
          ) : (
            '입력할 장소 주소'
          )
        )}
        value={placeAddress}
        onChange={handleChangePlaceAddressDirectly}
        hasError={(
          formErrors.BLANK_PLACE
              || serverError
        )}
        disabled={!inputPlaceDirectlyMode}
      />
    </>
  );
}
