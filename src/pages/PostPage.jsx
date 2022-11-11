import { useLocation } from 'react-router-dom';

import styled from 'styled-components';

import { useEffect } from 'react';

import usePostStore from '../hooks/usePostStore';

import PostInformation from '../components/PostInformation';
// import PostPositions from '../components/PostPositions';
// import useMemberStore from '../hooks/useMemberStore';

const Container = styled.article`
  
`;

export default function PostPage() {
  const location = useLocation();

  const postId = location.state !== null
    ? location.state.postId
    : Number(location.pathname.split('/')[2]);

  const postStore = usePostStore();
  // const memberStore = useMemberStore();

  useEffect(() => {
    postStore.fetchPost(postId);
  }, []);

  const { postInformation, postPositions } = postStore;

  // const register = ({ gameId, teamId, roleId }) => {
  //   memberStore.register({ gameId, teamId, roleId });
  //   postStore.fetchPost(postId);
  // };

  // const cancelRegister = (roleId) => {
  //   memberStore.cancelRegister(roleId);
  //   postStore.fetchPost(postId);
  // };

  return (
    <Container>
      {postInformation && postPositions ? (
        <>
          <PostInformation
            information={postInformation}
          />
          {/* <PostPositions
            teamsAndPositions={postPositions}
            handleClickRegister={register}
            handleClickCancelRegister={cancelRegister}
          /> */}
        </>
      ) : (
        <p>Now Loading...</p>
      )}
    </Container>
  );
}
