import styled from 'styled-components';

const Container = styled.section`
  
`;

export default function PostsRegisterButton({
  gameId,
  isRegistered,
  registerToGame,
  cancelRegisterGame,
  registerErrorCodeAndMessage,
}) {
  const handleRegisterToGameClick = (id) => {
    registerToGame(id);
  };

  const handleCancelRegisterGameClick = (id) => {
    cancelRegisterGame(id);
  };

  return (
    <Container>
      {isRegistered ? (
        <button
          type="button"
          onClick={() => handleCancelRegisterGameClick(gameId)}
        >
          신청취소
        </button>
      ) : (
        <button
          type="button"
          onClick={() => handleRegisterToGameClick(gameId)}
        >
          신청
        </button>
      )}
      {registerErrorCodeAndMessage.message ? (
        <p>
          {registerErrorCodeAndMessage.message}
        </p>
      ) : (
        null
      )}
    </Container>
  );
}
