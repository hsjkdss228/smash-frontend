import styled from 'styled-components';

import { useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import useUserStore from '../../hooks/useUserStore';

import Container from '../ui/ComponentFullHeightScreenContainer';

import logoUrl from '../assets/images/BlackLogo.png';

import Logo from '../ui/LoginLogo';
import BackwardButton from '../backward-button/BackwardButton';
import LoginFormInput from './LoginFormInput';
import PrimaryButton from '../ui/PrimaryButton';
import SecondaryButton from '../ui/SecondaryButton';
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
        <Font>???????????? ????????? ?????? ?????????</Font>
        <Logo
          logoUrl={logoUrl}
        >
          SMASH
        </Logo>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputSection>
            <LoginFormInput
              htmlFor="input-username"
              labelName="?????????"
              id="input-username"
              type="text"
              placeholder="Username"
              register={register}
              name="username"
              requiredErrorMessage="???????????? ??????????????????."
              clearErrors={handleClearErrors}
            />
            <LoginFormInput
              htmlFor="input-password"
              labelName="????????????"
              id="input-password"
              type="password"
              placeholder="Password"
              register={register}
              name="password"
              requiredErrorMessage="??????????????? ??????????????????."
              clearErrors={handleClearErrors}
            />
          </InputSection>
          <ButtonSection>
            <PrimaryButton
              type="submit"
            >
              LOGIN
            </PrimaryButton>
            <SecondaryButton
              type="button"
              onClick={handleClickSignUp}
            >
              ????????????
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
