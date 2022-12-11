/* eslint-disable no-nested-ternary */

import styled from 'styled-components';
import PostGame from './PostGame';
import PostGameMembers from './PostGameMembers';
import PostRegisterButton from './PostRegisterButton';
import PostGameApplicants from './PostGameApplicants';
import BackwardButton from './BackwardButton';
import PostAuthorDetailAndImages from './ui/ComponentSectionContainer';
import PostAuthor from './PostAuthor';
import PostDetail from './PostDetail';
import Container from './ui/ComponentScreenContainer';
import Button from './ui/PrimaryButton';
import PostImages from './PostImages';
import PostPlace from './PostPlace';

const BackwardAndFunctions = styled.div`
  width: 100%;
  margin-bottom: 1.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Functions = styled.div`
  
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

const LoginGuidance = styled.div`
  font-size: .9em;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  padding: 1.25em;
  border-radius: 5px;
  background-color: #fff;
`;

export default function Post({
  loggedIn,
  navigateBackward,
  navigateLogin,
  navigateSelectTrialAccount,
  post,
  game,
  place,
  members,
  applicants,
  reconfirmDeletePost,
  handleClickRegister,
  reconfirmRegisterCancel,
  reconfirmParticipateCancel,
  handleClickAcceptRegister,
  reconfirmRegisterReject,
  registerError,
}) {
  const onClickBackward = () => {
    navigateBackward();
  };

  const onClickLogin = () => {
    navigateLogin();
  };

  const onClickSelectTrialAccount = () => {
    navigateSelectTrialAccount();
  };

  const onClickDeletePost = () => {
    reconfirmDeletePost(post.id);
  };

  const onClickRegister = () => {
    handleClickRegister(game.id);
  };

  const onClickRegisterCancel = () => {
    reconfirmRegisterCancel(game.registerId);
  };

  const onClickParticipateCancel = () => {
    reconfirmParticipateCancel(game.registerId);
  };

  const onClickAcceptRegister = (registerId) => {
    handleClickAcceptRegister(registerId);
  };

  const onClickRejectRegister = (registerId) => {
    reconfirmRegisterReject(registerId);
  };

  if (!post || !game || !members
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
          onClick={onClickBackward}
        />
        {post.isAuthor ? (
          <Functions>
            <Button
              type="button"
            >
              수정하기
            </Button>
            <Button
              type="button"
              onClick={onClickDeletePost}
            >
              삭제하기
            </Button>
          </Functions>
        ) : (
          null
        )}
      </BackwardAndFunctions>
      {/* TODO: game.type을 name으로 바꿔야 함 */}
      <PostGame
        name={game.type}
        date={game.date}
        place={place.name}
        currentMemberCount={game.currentMemberCount}
        targetMemberCount={game.targetMemberCount}
        hits={post.hits}
      />
      <PostAuthorDetailAndImages>
        <PostAuthor
          authorName={post.authorName}
          authorPhoneNumber={post.authorPhoneNumber}
          authorProfileImageUrl={post.authorProfileImageUrl}
          authorMannerScore={post.authorMannerScore}
        />
        <PostDetail
          detail={post.detail}
        />
        <PostImages
          imageUrls={post.imageUrls}
        />
      </PostAuthorDetailAndImages>
      <PostPlace
        place={place}
      />
      <PostGameMembers
        members={members}
        isAuthor={post.isAuthor}
        registerStatus={game.registerStatus}
      />
      {loggedIn ? (
        post.isAuthor ? (
          <PostGameApplicants
            applicants={applicants}
            cannotAcceptRegister={(
              game.currentMemberCount >= game.targetMemberCount
            )}
            onClickAcceptRegister={onClickAcceptRegister}
            onClickRejectRegister={onClickRejectRegister}
          />
        ) : (
          game.registerStatus === 'processing' || game.registerStatus === 'accepted' ? (
            <PostRegisterButton
              registerStatus={game.registerStatus}
              onClickRegister={onClickRegister}
              onClickRegisterCancel={onClickRegisterCancel}
              onClickParticipateCancel={onClickParticipateCancel}
              registerError={registerError}
            />
          ) : (
            game.currentMemberCount >= game.targetMemberCount ? (
              <p>참가 정원이 모두 찼습니다.</p>
            ) : (
              <PostRegisterButton
                registerStatus={game.registerStatus}
                onClickRegister={onClickRegister}
                onClickRegisterCancel={onClickRegisterCancel}
                onClickParticipateCancel={onClickParticipateCancel}
                registerError={registerError}
              />
            )
          )
        )
      ) : (
        game.currentMemberCount >= game.targetMemberCount ? (
          <GameIsFull>참가 정원이 모두 찼습니다.</GameIsFull>
        ) : (
          <LoginGuidance>
            <p>참가를 신청하려면 로그인이 필요합니다.</p>
            <Button
              type="button"
              onClick={onClickLogin}
            >
              로그인하기
            </Button>
            <Button
              type="button"
              onClick={onClickSelectTrialAccount}
            >
              체험 계정 선택하기
            </Button>
          </LoginGuidance>
        )
      )}
    </Container>
  );
}
