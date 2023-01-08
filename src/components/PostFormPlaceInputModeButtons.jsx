import styled from 'styled-components';
import usePostFormStore from '../hooks/usePostFormStore';

const ToggleButton = styled.button`
  color: ${({ toggledState }) => (
    toggledState ? '#fff' : '#FF7A63'
  )};
  padding: .5em 1.25em;
  border: ${({ toggledState }) => (
    toggledState ? '1px solid transparent' : '1px solid #CCC'
  )};
  border-radius: 5px;
  margin-inline: .3em;
  background-color: ${({ toggledState }) => (
    toggledState ? '#FF7A63' : '#fff'
  )};

  :hover {
    color: #fff;
    border-color: transparent;
    background-color: #FF7A63;
  }

  :active {
    color: #fff;
    border-color: transparent;
    background-color: #090040;
  }
`;

export default function PostFormPlaceInputModeButtons() {
  const postFormStore = usePostFormStore();

  const {
    searchPlaceMode,
    inputPlaceDirectlyMode,
  } = postFormStore;

  const handleClickSearchPlaceMode = () => {
    postFormStore.changeInputPlaceModeToSearch();
  };

  const handleClickInputPlaceDirectlyMode = () => {
    postFormStore.changeInputPlaceModeToInputDirectly();
  };

  return (
    <div>
      <ToggleButton
        toggledState={searchPlaceMode}
        type="button"
        onClick={handleClickSearchPlaceMode}
      >
        장소 검색
      </ToggleButton>
      <ToggleButton
        toggledState={inputPlaceDirectlyMode}
        type="button"
        onClick={handleClickInputPlaceDirectlyMode}
      >
        직접 입력
      </ToggleButton>
    </div>
  );
}
