/* eslint-disable no-nested-ternary */

import { useState } from 'react';
import styled from 'styled-components';

import PostsContent from './PostsContent';
import Container from './ui/Container';
import PostsButton from './ui/PostsButton';

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

  const onClickPost = (postId) => {
    navigatePost(postId);
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
          <PostsButton
            type="button"
            onClick={toggleSearchSetting}
          >
            검색조건 설정
          </PostsButton>
          <PostsButton
            type="button"
            onClick={toggleFilterSetting}
          >
            조회방식 설정
          </PostsButton>
        </SettingToggleButtons>
      </SearchAndSettingToggleButton>
      {searchSetting && (
        <SearchSettingSection>
          <PostsButton
            type="button"
          >
            종목
          </PostsButton>
          <PostsButton
            type="button"
          >
            장소
          </PostsButton>
          <PostsButton
            type="button"
          >
            작성자
          </PostsButton>
          <PostsButton
            type="button"
          >
            참가자
          </PostsButton>
          <PostsButton
            type="button"
          >
            신청자
          </PostsButton>
        </SearchSettingSection>
      )}
      {filterSetting && (
        <FilterSettingSection>
          <PostsButton
            type="button"
          >
            내가 참가하는 운동
          </PostsButton>
          <PostsButton
            type="button"
          >
            내가 모집하는 운동
          </PostsButton>
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
          <PostsButton
            type="button"
          >
            지도
          </PostsButton>
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
