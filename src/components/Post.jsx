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

export default function Post({
  navigateToBackward,
  post,
  game,
  members,
  applicants,
  handleClickDeletePost,
  handleClickRegister,
  handleClickRegisterCancel,
  handleClickParticipateCancel,
  acceptRegister,
  rejectRegister,
  registerError,
}) {
  const onClickBackward = () => {
    navigateToBackward();
  };

  const onClickDeletePost = () => {
    handleClickDeletePost(post.id);
  };

  const onClickRegister = () => {
    handleClickRegister(game.id);
  };

  const onClickRegisterCancel = () => {
    handleClickRegisterCancel(game.registerId);
  };

  const onClickParticipateCancel = () => {
    handleClickParticipateCancel(game.registerId);
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
        {post.isAuthor ? (
          <PostGameApplicantsInformation
            applicants={applicants}
            cannotAcceptRegister={(
              game.currentMemberCount >= game.targetMemberCount
            )}
            acceptRegister={acceptRegister}
            rejectRegister={rejectRegister}
          />
        ) : (
          <PostRegisterButton
            currentMemberCount={game.currentMemberCount}
            targetMemberCount={game.targetMemberCount}
            registerStatus={game.registerStatus}
            onClickRegister={onClickRegister}
            onClickRegisterCancel={onClickRegisterCancel}
            onClickParticipateCancel={onClickParticipateCancel}
            registerError={registerError}
          />
        )}
      </PostInformation>
    </Container>
  );
}
