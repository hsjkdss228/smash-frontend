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

export default function PostRegisterButton({
  registerStatus,
  onClickRegister,
  onClickRegisterCancel,
  onClickParticipateCancel,
}) {
  if (registerStatus === 'none') {
    return (
      <RegisterButtonSection>
        <Button
          type="button"
          onClick={onClickRegister}
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
          type="button"
          onClick={onClickRegisterCancel}
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
        type="button"
        onClick={onClickParticipateCancel}
      >
        참가취소
      </Button>
    </RegisterButtonSection>
  );
}
