/* eslint-disable no-nested-ternary */

import styled from 'styled-components';

import Container from './ui/ComponentFullHeightScreenContainer';
import BackwardButton from './BackwardButton';
import PrimaryButton from './ui/PrimaryButton';
import SecondaryButton from './ui/SecondaryButton';

import Logo from './ui/LoginLogo';

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

const Input = styled.input`
  width: 100%;
  font-size: 1em;
  padding: 1em;
  border: 1px solid #D8D8D8;
  margin-bottom: .75em;

  :focus {
    outline: none;
  }

  ::placeholder {
    font-size: .8em;
    color: #A0A0A0;
  }
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

const Error = styled.p`
  font-size: .8em;
  text-align: center;
  margin-top: 3em;
  color: #F00;
`;

export default function LoginForm({
  onClickBackward,
  onClickSignUp,
  register,
  handleSubmit,
  clearErrors,
  clearServerError,
  login,
  loginFormError,
  loginServerError,
}) {
  const handleClickBackward = () => {
    onClickBackward();
  };

  const submit = async (data) => {
    await login(data);
  };

  const handleClickSignUp = () => {
    onClickSignUp();
  };

  return (
    <Container>
      <Top>
        <BackwardButton
          onClick={handleClickBackward}
        />
      </Top>
      <LoginSection>
        <Font>나만의 스포츠 매칭 시스템</Font>
        <Logo>
          SMASH
        </Logo>
        <Form onSubmit={handleSubmit(submit)}>
          <InputSection>
            <div>
              <label htmlFor="input-username">
                아이디
              </label>
              <Input
                id="input-username"
                type="text"
                placeholder="Username"
                {...register(
                  'username',
                  { required: { value: true, message: '아이디를 입력해주세요.' } },
                )}
                onChange={() => {
                  clearErrors();
                  clearServerError();
                }}
              />
            </div>
            <div>
              <label htmlFor="input-password">
                비밀번호
              </label>
              <Input
                id="input-password"
                type="password"
                placeholder="Password"
                {...register(
                  'password',
                  { required: { value: true, message: '비밀번호를 입력해주세요.' } },
                )}
                onChange={() => {
                  clearErrors();
                  clearServerError();
                }}
              />
            </div>
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
            {!Object.keys(loginFormError).length && !loginServerError ? (
              null
            ) : Object.keys(loginFormError).length >= 1 ? (
              <div>
                {loginFormError.username ? (
                  <Error>{loginFormError.username.message}</Error>
                ) : (
                  <Error>{loginFormError.password.message}</Error>
                )}
              </div>
            ) : (
              <Error>{loginServerError}</Error>
            )}
          </ButtonSection>
        </Form>
      </LoginSection>
    </Container>
  );
}
