import styled from 'styled-components';
import PostGameInformation from './PostGameInformation';
import PostInformation from './PostInformation';
import PostMemberInformation from './PostMemberInformation';

const Container = styled.article`
  
`;

export default function Post({
  post,
  game,
  members,
}) {
  return (
    <Container>
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
      {/* TODO: post.isAuthor를 기준으로
          PostRegisterButton, PostApplicants? 컴포넌트 구분 */}
    </Container>
  );
}
