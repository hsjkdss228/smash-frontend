import styled from 'styled-components';

const RegisterButtonSection = styled.div`
  font-size: 1.1em;
  display: flex;
  align-items: center;

  p {
    margin-right: .7em;
  }
`;

const Button = styled.button`
  font-size: 1em;
  padding: .3em;
  border: 1px solid #000;
`;

export default function PostsRegisterButton({
  gameId,
  registerId,
  registerStatus,
  registerToGame,
  cancelRegisterToGame,
  cancelParticipateToGame,
}) {
  const handleClickRegister = (targetGameId) => {
    registerToGame(targetGameId);
  };

  const handleClickCancelRegister = (targetRegisterId) => {
    cancelRegisterToGame(targetRegisterId);
  };

  const handleClickCancelParticipate = (targetRegisterId) => {
    cancelParticipateToGame(targetRegisterId);
  };

  if (registerStatus === 'none') {
    return (
      <RegisterButtonSection>
        <p>바로 신청하고 싶다면?</p>
        <Button
          id={`posts-register-button-${gameId}`}
          type="button"
          onClick={() => handleClickRegister(gameId)}
        >
          신청
        </Button>
      </RegisterButtonSection>
    );
  }

  if (registerStatus === 'processing') {
    return (
      <RegisterButtonSection>
        <Button
          id={`posts-register-button-${gameId}`}
          type="button"
          onClick={() => handleClickCancelRegister(registerId)}
        >
          신청취소
        </Button>
      </RegisterButtonSection>
    );
  }

  // if (registerStatus === 'accepted')
  return (
    <RegisterButtonSection>
      <Button
        id={`posts-register-button-${gameId}`}
        type="button"
        onClick={() => handleClickCancelParticipate(registerId)}
      >
        참가취소
      </Button>
    </RegisterButtonSection>
  );
}
