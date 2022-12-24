import styled from 'styled-components';

import { useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import useUserStore from '../hooks/useUserStore';

import Container from './ui/ComponentFullHeightScreenContainer';

import logoUrl from './assets/images/BlackLogo.png';

import Logo from './ui/LoginLogo';
import BackwardButton from './BackwardButton';
import LoginFormInput from './LoginFormInput';
import PrimaryButton from './ui/PrimaryButton';
import SecondaryButton from './ui/SecondaryButton';
import LoginError from './LoginError';

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const LoginSection = styled.div`
  height: 100%;
  width: 25em;
  margin-bottom: 10em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Font = styled.p`
  font-size: 1.5em;
  font-family: 'Gowun Dodum', sans-serif;
  font-weight: 400;
`;

const Form = styled.form`
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 1em;

  label {
    display: none;
  }
`;

const InputSection = styled.div`
  
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  button {
    height: 3.5em;
    margin-bottom: .2em;
  }
`;

export default function LoginForm({
  navigateBackward,
  navigateSignUp,
}) {
  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const userStore = useUserStore();

  useEffect(() => {
    userStore.clearLoginError();
  }, []);

  const { loginServerError } = userStore;

  const {
    register, handleSubmit, formState: { errors }, clearErrors,
  } = useForm({ reValidateMode: 'onSubmit' });

  const handleClickBackward = () => {
    navigateBackward();
  };

  const handleClearErrors = () => {
    clearErrors();
    userStore.clearLoginError();
  };

  const login = async ({ username, password }) => {
    const verifiedAccessToken = await userStore.login({ username, password });
    if (verifiedAccessToken) {
      setAccessToken(verifiedAccessToken);
      navigateBackward();
    }
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();
    await login({ username: data.username, password: data.password });
  };

  const handleClickSignUp = () => {
    navigateSignUp();
  };

  return (
    <Container>
      <Top>
        <BackwardButton
          onClick={handleClickBackward}
        />
      </Top>
      <LoginSection>
        <Font>우리들의 스포츠 매칭 시스템</Font>
        <Logo
          logoUrl={logoUrl}
        >
          SMASH
        </Logo>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputSection>
            <LoginFormInput
              htmlFor="input-username"
              labelName="아이디"
              id="input-username"
              type="text"
              placeholder="Username"
              register={register}
              name="username"
              requiredErrorMessage="아이디를 입력해주세요."
              clearErrors={handleClearErrors}
            />
            <LoginFormInput
              htmlFor="input-password"
              labelName="비밀번호"
              id="input-password"
              type="password"
              placeholder="Password"
              register={register}
              name="password"
              requiredErrorMessage="비밀번호를 입력해주세요."
              clearErrors={handleClearErrors}
            />
          </InputSection>
          <ButtonSection>
            <PrimaryButton
              type="submit"
            >
              로그인
            </PrimaryButton>
            <SecondaryButton
              type="button"
              onClick={handleClickSignUp}
            >
              회원가입
            </SecondaryButton>
          </ButtonSection>
        </Form>
        <LoginError
          loginFormError={errors}
          loginServerError={loginServerError}
        />
      </LoginSection>
    </Container>
  );
}
