/* eslint-disable no-nested-ternary */

import { useState } from 'react';
import styled from 'styled-components';

import PostsContent from './PostsContent';
import Container from './ui/ComponentScreenContainer';
import SecondaryButton from './ui/SecondaryButton';

const SearchAndSettingToggleButton = styled.div`
  width: 100%;
  margin-bottom: 1em;
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
  margin-bottom: 1em;
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
  margin-bottom: 1em;
  border: 1px solid #CCC;
  background-color: #fff;

  button:first-child {
    margin-left: 1em;
  }
`;

const PostsSection = styled.section`
  width: 100%;
  border: 1px solid #CCC;
  background-color: #FFFFFFBB;
`;

const SelectListOrMap = styled.nav`
  margin: 1em 1em 1.5em;
  display: flex;
  align-items: center;
  
  p {
    font-size: 1.1em;
    font-weight: bold;
    margin-right: 1em;
  }
`;

const ListButton = styled.button`
  color: #fff;
  padding: .5em 1.25em;
  border-radius: 5px;
  margin-inline: .3em;
  background-color: #FF7A63;
`;

const PostsList = styled.section`
  margin: 1em 1em 7em;
`;

const Thumbnails = styled.ul`
  
`;

const Thumbnail = styled.li`
  margin: 1em 0 .8em;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export default function Posts({
  loggedIn,
  searchSetting,
  filterSetting,
  toggleSearchSetting,
  toggleFilterSetting,
  posts,
  navigatePost,
  postsServerError,
}) {
  // TODO: 검색 조건 상태, 조회 방식 설정 상태는 별도의 FormStore를 생성해 저장하는 방식으로 리팩터링
  //   클릭된 버튼의 상태를 검사해 클릭된 버튼의 경우 hover 시의 색상을 항상 유지

  const [searchKeyword, changeSearchKeyword] = useState('');

  // TODO: toggledState 상태는 추후 검색을 위한 별도의 Store에서 관리하도록 하고,
  //   임시로 설정한 setState 함수들도 모두 Store에서 처리하도록 해야 함

  const [exerciseSelection, toggleExerciseSelection] = useState(false);
  const [placeSelection, togglePlaceSelection] = useState(false);
  const [authorSelection, toggleAuthorSelection] = useState(false);
  const [memberSelection, toggleMemberSelection] = useState(false);
  const [applicantSelection, toggleApplicantSelection] = useState(false);

  const [registeredSelection, setRegisteredSelection] = useState(false);
  const [writtenSelection, setWrittenSelection] = useState(false);

  const onClickPost = (postId) => {
    navigatePost(postId);
  };

  const resetToggleState = () => {
    toggleExerciseSelection(false);
    togglePlaceSelection(false);
    toggleAuthorSelection(false);
    toggleMemberSelection(false);
    toggleApplicantSelection(false);
  };

  const resetRegisteredOrWritten = () => {
    setRegisteredSelection(false);
    setWrittenSelection(false);
  };

  // TODO: 컴포넌트들을 여러 개의 독립적인 컴포넌트들로 분리

  return (
    <Container>
      <SearchAndSettingToggleButton>
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
            onClick={toggleSearchSetting}
          >
            검색조건 설정
          </ToggleButton>
          <ToggleButton
            toggledState={filterSetting}
            type="button"
            onClick={toggleFilterSetting}
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
            onClick={() => {
              resetRegisteredOrWritten();
              toggleExerciseSelection(!exerciseSelection);
            }}
          >
            종목
          </ToggleButton>
          <ToggleButton
            toggledState={placeSelection}
            type="button"
            onClick={() => {
              resetRegisteredOrWritten();
              togglePlaceSelection(!placeSelection);
            }}
          >
            장소
          </ToggleButton>
          <ToggleButton
            toggledState={authorSelection}
            type="button"
            onClick={() => {
              resetRegisteredOrWritten();
              toggleAuthorSelection(!authorSelection);
            }}
          >
            작성자
          </ToggleButton>
          <ToggleButton
            toggledState={memberSelection}
            type="button"
            onClick={() => {
              resetRegisteredOrWritten();
              toggleMemberSelection(!memberSelection);
            }}
          >
            참가자
          </ToggleButton>
          <ToggleButton
            toggledState={applicantSelection}
            type="button"
            onClick={() => {
              resetRegisteredOrWritten();
              toggleApplicantSelection(!applicantSelection);
            }}
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
            onClick={() => {
              resetToggleState();
              setRegisteredSelection(true);
              setWrittenSelection(false);
            }}
          >
            내가 참가하는 운동
          </ToggleButton>
          <ToggleButton
            toggledState={writtenSelection}
            type="button"
            onClick={() => {
              resetToggleState();
              setRegisteredSelection(false);
              setWrittenSelection(true);
            }}
          >
            내가 모집하는 운동
          </ToggleButton>
        </FilterSettingSection>
      )}
      <PostsSection>
        <SelectListOrMap>
          <p>조회 방식 선택</p>
          <ListButton
            type="button"
          >
            리스트
          </ListButton>
          <SecondaryButton
            type="button"
          >
            지도
          </SecondaryButton>
        </SelectListOrMap>
        <PostsList>
          {posts.length === 0 ? (
            <p>등록된 게시물이 존재하지 않습니다.</p>
          ) : postsServerError ? (
            <p>{postsServerError}</p>
          ) : (
            <Thumbnails>
              {posts.map((post) => (
                <Thumbnail key={post.id}>
                  <PostsContent
                    loggedIn={loggedIn}
                    imageUrl={post.thumbnailImageUrl}
                    hits={post.hits}
                    isAuthor={post.isAuthor}
                    type={post.game.type}
                    date={post.game.date}
                    place={post.place.name}
                    currentMemberCount={post.game.currentMemberCount}
                    targetMemberCount={post.game.targetMemberCount}
                    registerStatus={post.game.registerStatus}
                    onClickPost={() => onClickPost(post.id)}
                  />
                </Thumbnail>
              ))}
            </Thumbnails>
          )}
        </PostsList>
      </PostsSection>
    </Container>
  );
}
