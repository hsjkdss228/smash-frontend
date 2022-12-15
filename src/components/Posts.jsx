/* eslint-disable no-nested-ternary */

import styled from 'styled-components';
import { useEffect } from 'react';
import usePostStore from '../hooks/usePostStore';

import ComponentSectionContainer from './ui/ComponentSectionContainer';
import PostsContent from './PostsContent';
import SecondaryButton from './ui/SecondaryButton';

const SelectListOrMap = styled.nav`
  padding-bottom: .5em;
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
  margin-bottom: 7em;
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
  navigatePost,
}) {
  const postStore = usePostStore();

  useEffect(() => {
    postStore.fetchPosts();
  }, []);

  const {
    posts,
    postsServerError,
  } = postStore;

  const handleClickPost = (postId) => {
    navigatePost(postId);
  };

  return (
    <ComponentSectionContainer
      backgroundColor="#FFFFFFBB"
    >
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
                  imageUrl={post.thumbnailImageUrl}
                  hits={post.hits}
                  isAuthor={post.isAuthor}
                  type={post.game.type}
                  date={post.game.date}
                  place={post.place.name}
                  currentMemberCount={post.game.currentMemberCount}
                  targetMemberCount={post.game.targetMemberCount}
                  registerStatus={post.game.registerStatus}
                  onClickPost={() => handleClickPost(post.id)}
                />
              </Thumbnail>
            ))}
          </Thumbnails>
        )}
      </PostsList>
    </ComponentSectionContainer>
  );
}
