import styled from 'styled-components';
import PostGameInformation from './PostGameInformation';
import PostInformation from './PostInformation';
import PostMemberInformation from './PostGameMembersInformation';
import PostRegisterButton from './PostRegisterButton';
import PostGameApplicantsInformation from './PostGameApplicantsInformation';

const Container = styled.article`
  margin-inline: 10em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Backward = styled.button`
  
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
      <Backward
        type="button"
        onClick={onClickBackward}
      >
        ⬅️
      </Backward>
      <PostInformation
        hits={post.hits}
        authorName={post.authorName}
        authorPhoneNumber={post.authorPhoneNumber}
        detail={post.detail}
      />
      <PostGameInformation
        type={game.type}
        date={game.date}
        place={game.place}
        currentMemberCount={game.currentMemberCount}
        targetMemberCount={game.targetMemberCount}
      />
      <PostMemberInformation
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
    </Container>
  );
}
