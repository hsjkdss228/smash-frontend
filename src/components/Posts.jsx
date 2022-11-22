import styled from 'styled-components';

import PostsContent from './PostsContent';
import PostsRegisterButton from './PostsRegisterButton';
import BackwardButton from './ui/BackwardButton';

const Container = styled.article`
  padding-block: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Thumbnails = styled.ul`
  
`;

const Thumbnail = styled.li`
  margin: 1em 0 3em;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export default function Posts({
  posts,
  navigateToBackward,
  navigateToPost,
  registerToGame,
  cancelRegisterToGame,
  cancelParticipateToGame,
  postsErrorMessage,
  registerErrorCodeAndMessage,
}) {
  const onClickBackward = () => {
    navigateToBackward();
  };

  const onClickPost = (postId) => {
    navigateToPost(postId);
  };

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
      <BackwardButton
        type="button"
        onClick={onClickBackward}
      >
        ⬅️
      </BackwardButton>
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
              onClickPost={() => onClickPost(post.id)}
            />
            {
              post.isAuthor ? (
                null
              ) : (
                <>
                  <PostsRegisterButton
                    gameId={post.game.id}
                    registerId={post.game.registerId}
                    registerStatus={post.game.registerStatus}
                    registerToGame={registerToGame}
                    cancelRegisterToGame={cancelRegisterToGame}
                    cancelParticipateToGame={cancelParticipateToGame}
                  />
                  {registerErrorCodeAndMessage.message ? (
                    <p>
                      {registerErrorCodeAndMessage.message}
                    </p>
                  ) : (
                    null
                  )}
                </>
              )
            }
          </Thumbnail>
        ))}
      </Thumbnails>
    </Container>
  );
}
