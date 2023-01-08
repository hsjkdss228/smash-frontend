/* eslint-disable no-nested-ternary */

import styled from 'styled-components';

import Button from '../ui/PrimaryButton';

const Container = styled.section`
  font-size: .9em;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  padding: 1.25em;
  border-radius: 5px;
  background-color: #fff;
`;

export default function PostLoginGuidance({
  navigateLogin,
  navigateSelectTrialAccount,
}) {
  const onClickLogin = () => {
    navigateLogin();
  };

  const onClickSelectTrialAccount = () => {
    navigateSelectTrialAccount();
  };

  return (
    <Container>
      <p>참가를 신청하려면 로그인이 필요합니다.</p>
      <Button
        type="button"
        onClick={onClickLogin}
      >
        로그인하기
      </Button>
      <Button
        type="button"
        onClick={onClickSelectTrialAccount}
      >
        체험 계정 선택하기
      </Button>
    </Container>
  );
}
