import styled from 'styled-components';

import Container from './ui/ComponentFullHeightScreenContainer';

import PrimaryButton from './ui/PrimaryButton';
import SecondaryButton from './ui/SecondaryButton';

const CenterWrapper = styled.div`
  height: 100%;
  margin-bottom: 15em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserName = styled.div`
  font-size: 2em;
  margin-bottom: 1em;

  span {
    color: #090040;
    font-weight: bold;
  }
`;

// const MessageToUser = styled.div`
//   font-size: 1.25em;
//   text-align: center;
//   margin-bottom: 2em;
// `;

const Buttons = styled.nav`
  button {
    padding: 1em 2em;
    margin-inline: 1em;
  }
`;

export default function Welcome({
  name,
  navigate,
}) {
  return (
    <Container>
      <CenterWrapper>
        <UserName>
          <p>
            <span>{name}</span>
            {' '}
            님, 반갑습니다.
          </p>
        </UserName>
        <Buttons>
          <PrimaryButton
            type="button"
            onClick={() => navigate('/')}
          >
            홈으로
          </PrimaryButton>
          <SecondaryButton
            type="button"
            onClick={() => navigate('/write')}
          >
            운동 모집하기
          </SecondaryButton>
        </Buttons>
      </CenterWrapper>
    </Container>
  );
}
