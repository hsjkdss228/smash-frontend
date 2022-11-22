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

const PostInformation = styled.div`
  
`;

export default function Post({
  navigateToBackward,
  post,
  game,
  members,
  applicants,
  handleClickRegister,
  handleClickRegisterCancel,
  handleClickParticipateCancel,
  acceptRegister,
  rejectRegister,
}) {
  const onClickBackward = () => {
    navigateToBackward();
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
      <BackwardButton
        type="button"
        onClick={onClickBackward}
      >
        ⬅️
      </BackwardButton>
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
            acceptRegister={acceptRegister}
            rejectRegister={rejectRegister}
          />
        ) : (
          <PostRegisterButton
            registerStatus={game.registerStatus}
            onClickRegister={onClickRegister}
            onClickRegisterCancel={onClickRegisterCancel}
            onClickParticipateCancel={onClickParticipateCancel}
          />
        )}
      </PostInformation>
    </Container>
  );
}
