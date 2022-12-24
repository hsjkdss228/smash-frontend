import { useEffect, useState } from 'react';
import styled from 'styled-components';
import usePostStore from '../hooks/usePostStore';

const Container = styled.section`
  width: 100%;
  margin-bottom: 1em;
`;

const SearchAndSettingToggleButton = styled.div`
  width: 100%;
  margin-bottom: ${({ settingSectionOpened }) => (
    settingSectionOpened ? '1em' : '0'
  )};
  display: flex;
  justify-content: space-between;
`;

const Search = styled.div`
  label {
    display: none;
  }

  input {
    width: 13em;
    padding: .5em;
    border: 1px solid #CCC;
    margin-right: .6em;
  }

  input::placeholder {
    color: #CCC;
  }

  button {
    padding: .5em 1.25em;
    border: 1px solid #CCC;
    border-radius: 5px;
    background-color: #fff;
  }
`;

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

const SettingToggleButtons = styled.div`
  
`;

const SearchSettingSection = styled.section`
  width: 100%;
  padding-block: 1em;
  border: 1px solid #CCC;
  background-color: #fff;

  button {
    padding-inline: 1.75em;
  }

  button:first-child {
    margin-left: 1em;
  }
`;

const FilterSettingSection = styled.section`
  width: 100%;
  padding-block: 1em;
  border: 1px solid #CCC;
  background-color: #fff;

  button:first-child {
    margin-left: 1em;
  }
`;

export default function PostsSearchAndSettings() {
  const [searchSetting, toggleSearchSetting] = useState(false);
  const [filterSetting, toggleFilterSetting] = useState(false);

  const [searchKeyword, changeSearchKeyword] = useState('');

  const postStore = usePostStore();

  useEffect(() => {
    postStore.resetSearchConditionState();
    postStore.resetLookUpConditionState();
  }, []);

  const {
    exerciseSelection,
    placeSelection,
    authorSelection,
    memberSelection,
    applicantSelection,
    registeredSelection,
    writtenSelection,
  } = postStore;

  const handleClickToggleSearchSetting = () => {
    toggleSearchSetting(!searchSetting);
    toggleFilterSetting(false);
  };

  const handleClickToggleFilterSetting = () => {
    toggleSearchSetting(false);
    toggleFilterSetting(!filterSetting);
  };

  const handleClickExerciseButton = () => {
    postStore.changeExerciseSelection();
  };

  const handleClickPlaceButton = () => {
    postStore.changePlaceSelection();
  };

  const handleClickAuthorButton = () => {
    postStore.changeAuthorSelection();
  };

  const handleClickMemberButton = () => {
    postStore.changeMemberSelection();
  };

  const handleClickApplicantButton = () => {
    postStore.changeApplicantSelection();
  };

  const handleClickRegisteredButton = () => {
    postStore.setRegisteredSelection();
  };

  const handleClickWrittenButton = () => {
    postStore.setWrittenSelection();
  };

  return (
    <Container>
      <SearchAndSettingToggleButton
        settingSectionOpened={searchSetting || filterSetting}
      >
        <Search>
          <label htmlFor="post-keyword">
            검색어
          </label>
          <input
            id="post-keyword"
            type="text"
            placeholder="검색어 입력"
            value={searchKeyword}
            onChange={(event) => changeSearchKeyword(event.target.value)}
          />
          <button
            type="button"
          >
            검색
          </button>
        </Search>
        <SettingToggleButtons>
          <ToggleButton
            toggledState={searchSetting}
            type="button"
            onClick={handleClickToggleSearchSetting}
          >
            검색조건 설정
          </ToggleButton>
          <ToggleButton
            toggledState={filterSetting}
            type="button"
            onClick={handleClickToggleFilterSetting}
          >
            조회방식 설정
          </ToggleButton>
        </SettingToggleButtons>
      </SearchAndSettingToggleButton>
      {searchSetting && (
        <SearchSettingSection>
          <ToggleButton
            toggledState={exerciseSelection}
            type="button"
            onClick={handleClickExerciseButton}
          >
            종목
          </ToggleButton>
          <ToggleButton
            toggledState={placeSelection}
            type="button"
            onClick={handleClickPlaceButton}
          >
            장소
          </ToggleButton>
          <ToggleButton
            toggledState={authorSelection}
            type="button"
            onClick={handleClickAuthorButton}
          >
            작성자
          </ToggleButton>
          <ToggleButton
            toggledState={memberSelection}
            type="button"
            onClick={handleClickMemberButton}
          >
            참가자
          </ToggleButton>
          <ToggleButton
            toggledState={applicantSelection}
            type="button"
            onClick={handleClickApplicantButton}
          >
            신청자
          </ToggleButton>
        </SearchSettingSection>
      )}
      {filterSetting && (
        <FilterSettingSection>
          <ToggleButton
            toggledState={registeredSelection}
            type="button"
            onClick={handleClickRegisteredButton}
          >
            내가 참가하는 운동
          </ToggleButton>
          <ToggleButton
            toggledState={writtenSelection}
            type="button"
            onClick={handleClickWrittenButton}
          >
            내가 모집하는 운동
          </ToggleButton>
        </FilterSettingSection>
      )}
    </Container>
  );
}
