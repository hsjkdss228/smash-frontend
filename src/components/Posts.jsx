import styled from 'styled-components';

import PostsContent from './PostsContent';
import PostsRegisterButton from './PostsRegisterButton';

const Container = styled.article`
  margin-inline: 10em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Thumbnails = styled.ul`
  
`;

const Thumbnail = styled.li`
  margin-block: 3em;
`;

export default function Posts({
  posts,
  postsErrorMessage,
  registerErrorCodeAndMessage,
  registerToGame,
  cancelRegisterGame,
}) {
  if (postsErrorMessage) {
    return (
      <p>{postsErrorMessage}</p>
    );
  }

  if (posts.length === 0) {
    return (
      <p>등록된 게시물이 존재하지 않습니다.</p>
    );
  }

  return (
    <Container>
      <Thumbnails>
        {posts.map((post) => (
          <Thumbnail key={post.id}>
            <PostsContent
              hits={post.hits}
              type={post.game.type}
              date={post.game.date}
              place={post.game.place}
              currentMemberCount={post.game.currentMemberCount}
              targetMemberCount={post.game.targetMemberCount}
            />
            <PostsRegisterButton
              gameId={post.game.id}
              isRegistered={post.game.isRegistered}
              registerToGame={registerToGame}
              cancelRegisterGame={cancelRegisterGame}
              registerErrorCodeAndMessage={registerErrorCodeAndMessage}
            />
          </Thumbnail>
        ))}
      </Thumbnails>
    </Container>
  );
}
