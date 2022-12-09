/* eslint-disable no-nested-ternary */

import styled from 'styled-components';

import PostsContent from './PostsContent';
import Container from './ui/Container';

const Settings = styled.div`

`;

const Thumbnails = styled.ul`
  
`;

const Thumbnail = styled.li`
  margin: 1em 0 3em;
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
  const onClickPost = (postId) => {
    navigatePost(postId);
  };

  return (
    <Container>
      <Settings>
        <button
          type="button"
          onClick={toggleSearchSetting}
        >
          검색조건 설정
        </button>
        <button
          type="button"
          onClick={toggleFilterSetting}
        >
          조회방식 설정
        </button>
        {searchSetting && (
          <div>
            <p>검색조건 설정 section</p>
          </div>
        )}
        {filterSetting && (
          <div>
            <p>조회방식 설정 section</p>
          </div>
        )}
      </Settings>
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
    </Container>
  );
}
