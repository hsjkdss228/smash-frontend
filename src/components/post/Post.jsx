/* eslint-disable no-nested-ternary */

import { useEffect } from 'react';

import styled from 'styled-components';

import { useLocalStorage } from 'usehooks-ts';

import usePostStore from '../../hooks/usePostStore';
import useGameStore from '../../hooks/useGameStore';
import usePlaceStore from '../../hooks/usePlaceStore';
import useRegisterStore from '../../hooks/useRegisterStore';

import Container from '../ui/ComponentScreenContainer';
import BackwardButton from '../backward-button/BackwardButton';

import PostAuthorMenu from './PostAuthorMenu';
import PostGame from './PostGame';
import PostContent from './PostContent';
import PostPlace from './PostPlace';
import PostGameMembers from './PostGameMembers';
import PostGameApplicants from './PostGameApplicants';
import PostRegisterButton from './PostRegisterButton';
import PostLoginGuidance from './PostLoginGuidance';

const BackwardAndFunctions = styled.div`
  width: 100%;
  margin-bottom: 1.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GameIsFull = styled.p`
  width: 100%;
  font-weight: bold;
  text-align: center;
  color: #fff;
  padding: 1.25em;
  border-radius: 5px;
  background-color: #A3A3A3;
`;

export default function Post({
  postId,
  navigateBackward,
  navigateLogin,
  navigateSelectTrialAccount,
  navigatePostsAfterDeleted,
}) {
  const [accessToken] = useLocalStorage('accessToken', '');
  const loggedIn = accessToken !== '';

  const postStore = usePostStore();
  const gameStore = useGameStore();
  const placeStore = usePlaceStore();
  const registerStore = useRegisterStore();

  const fetchData = async () => {
    await postStore.fetchPost(postId);
    const gameId = await gameStore.fetchGame(postId);
    const { isAuthor } = postStore.post;
    const { placeId } = gameStore.game;
    await placeStore.fetchPlace(placeId);
    await registerStore.fetchMembers(gameId);
    if (isAuthor) {
      await registerStore.fetchApplicants(gameId);
    }
  };

  useEffect(() => {
    fetchData(postId);
  }, [accessToken]);

  const { post } = postStore;
  const { game } = gameStore;

  if (!post || !game
    || Object.keys(post).length === 0
    || Object.keys(game).length === 0) {
    return (
      <p>정보를 불러오고 있습니다...</p>
    );
  }

  return (
    <Container>
      <BackwardAndFunctions>
        <BackwardButton
          onClick={navigateBackward}
        />
        {post.isAuthor && (
          <PostAuthorMenu
            navigatePostsAfterDeleted={navigatePostsAfterDeleted}
          />
        )}
      </BackwardAndFunctions>
      <PostGame />
      <PostContent />
      <PostPlace />
      <PostGameMembers />
      {loggedIn ? (
        post.isAuthor ? (
          <PostGameApplicants
            fetchData={fetchData}
          />
        ) : (
          game.registerStatus === 'processing'
            || game.registerStatus === 'accepted' ? (
              <PostRegisterButton
                fetchData={fetchData}
              />
            ) : (
              game.currentMemberCount >= game.targetMemberCount ? (
                <GameIsFull>참가 정원이 모두 찼습니다.</GameIsFull>
              ) : (
                <PostRegisterButton
                  fetchData={fetchData}
                />
              )
            )
        )
      ) : (
        game.currentMemberCount >= game.targetMemberCount ? (
          <GameIsFull>참가 정원이 모두 찼습니다.</GameIsFull>
        ) : (
          <PostLoginGuidance
            navigateLogin={navigateLogin}
            navigateSelectTrialAccount={navigateSelectTrialAccount}
          />
        )
      )}
    </Container>
  );
}
