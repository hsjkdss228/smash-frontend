/* eslint-disable no-nested-ternary */

import styled from 'styled-components';
import PostGameInformation from './PostGameInformation';
import PostGameMemberInformation from './PostGameMembersInformation';
import PostRegisterButton from './PostRegisterButton';
import PostGameApplicantsInformation from './PostGameApplicantsInformation';
import BackwardButton from './ui/BackwardButton';
import PostAuthorInformation from './PostAuthorInformation';
import PostDetail from './PostDetail';

const Container = styled.article`
  padding: 30px 0 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  padding-inline: 1em;
  border: 1px solid #000;
  margin-right: 1em;
`;

const PostInformation = styled.div`

`;

const LoginGuidance = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  
  button {
    border: 1px solid #000;
  }
`;

export default function Post({
  loggedIn,
  navigateToBackward,
  navigateToLogin,
  navigateToSelectTrialAccount,
  post,
  game,
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
    navigateToBackward();
  };

  const onClickLogin = () => {
    navigateToLogin();
  };

  const onClickSelectTrialAccount = () => {
    navigateToSelectTrialAccount();
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
      <TopSection>
        <BackwardButton
          type="button"
          onClick={onClickBackward}
        >
          ⬅️
        </BackwardButton>
        {post.isAuthor ? (
          <DeleteButton
            type="button"
            onClick={onClickDeletePost}
          >
            삭제하기
          </DeleteButton>
        ) : (
          null
        )}
      </TopSection>
      <PostInformation>
        <PostGameInformation
          type={game.type}
          date={game.date}
          place={game.place}
          currentMemberCount={game.currentMemberCount}
          targetMemberCount={game.targetMemberCount}
          hits={post.hits}
        />
        <PostAuthorInformation
          authorName={post.authorName}
          authorPhoneNumber={post.authorPhoneNumber}
        />
        <PostDetail
          detail={post.detail}
        />
        <PostGameMemberInformation
          members={members}
        />
        {loggedIn ? (
          post.isAuthor ? (
            <PostGameApplicantsInformation
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
            <p>참가 정원이 모두 찼습니다.</p>
          ) : (
            <LoginGuidance>
              <p>운동에 참가를 신청하려면 로그인해주세요.</p>
              <button
                type="button"
                onClick={onClickLogin}
              >
                로그인하기
              </button>
              <button
                type="button"
                onClick={onClickSelectTrialAccount}
              >
                체험 계정 선택하기
              </button>
            </LoginGuidance>
          )
        )}
      </PostInformation>
    </Container>
  );
}
