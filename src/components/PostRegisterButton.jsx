import styled from 'styled-components';

const RegisterButton = styled.button`
  font-size: 1em;
  width: 100%;
  font-weight: bold;
  color: #FF7A63;
  padding: 1.25em;
  border: 1px solid #CCC;
  border-radius: 5px;
  background-color: #fff;

  :hover {
    color: #fff;
    border-color: transparent;
    background-color: #FF7A63;
  }

  :active {
    color: #fff;
    border-color: transparent;
    background-color: #090040;
  }

  :disabled {
    color: #fff;
    border-color: transparent;
    background-color: #A3A3A3;
    cursor: default;
  }
`;

export default function PostRegisterButton({
  registerStatus,
  onClickRegister,
  onClickRegisterCancel,
  onClickParticipateCancel,
  registerError,
}) {
  if (registerStatus === 'none') {
    return (
      <>
        <RegisterButton
          type="button"
          onClick={onClickRegister}
        >
          참가 신청하기
        </RegisterButton>
        {registerError.errorCode ? (
          <p>{registerError.errorMessage}</p>
        ) : (
          null
        )}
      </>
    );
  }

  if (registerStatus === 'processing') {
    return (
      <RegisterButton
        type="button"
        onClick={onClickRegisterCancel}
      >
        신청 취소하기
      </RegisterButton>
    );
  }

  // if (registerStatus === 'accepted')
  return (
    <RegisterButton
      type="button"
      onClick={onClickParticipateCancel}
    >
      참가 취소하기
    </RegisterButton>
  );
}
