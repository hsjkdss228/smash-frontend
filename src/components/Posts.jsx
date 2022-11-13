import styled from 'styled-components';

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
  posts, postsErrorMessage, registerToGame, cancelRegisterGame,
}) {
  const handleRegisterToGameClick = (gameId) => {
    registerToGame(gameId);
  };

  const handleCancelRegisterGameClick = (gameId) => {
    cancelRegisterGame(gameId);
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
      <Thumbnails>
        {posts.map((post) => (
          <Thumbnail key={post.id}>
            <div>
              <p>
                조회수:
                {' '}
                {post.hits}
              </p>
              <p>{post.game.type}</p>
              <p>{post.game.date}</p>
              <p>{post.game.place}</p>
              <p>
                {post.game.currentMemberCount}
                /
                {post.game.targetMemberCount}
                명
              </p>
            </div>
            <div>
              {post.game.isRegistered ? (
                <button
                  type="button"
                  onClick={() => handleCancelRegisterGameClick(post.game.id)}
                >
                  신청취소
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleRegisterToGameClick(post.game.id)}
                >
                  신청
                </button>
              )}
            </div>
          </Thumbnail>
        ))}
      </Thumbnails>
    </Container>
  );
}
