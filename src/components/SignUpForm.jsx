/* eslint-disable no-nested-ternary */

import styled from 'styled-components';

import Container from './ui/ComponentFullHeightScreenContainer';
import BackwardButton from './BackwardButton';
import SecondaryButton from './ui/SecondaryButton';
import SignUpFormTextInput from './SignUpFormTextInput';
import SignUpFormGenderRadioButton from './SignUpFormGenderRadioButton';

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const Title = styled.h2`
  font-size: 3em;
  font-weight: bold;
  margin-bottom: 1em;
`;

const SignUpSection = styled.section`
  height: 100%;
  width: 25em;
  margin-bottom: 10em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  div:nth-child(5) {
    margin: 0;
  }

  button {
    padding: 1.25em;
    margin: 0;
  }
`;

export default function SignUpForm({
  onClickBackward,
  register,
  handleSubmit,
  clearErrors,
  clearServerError,
  signUp,
  formError,
  serverError,
}) {
  const submit = async (data) => {
    await signUp(data);
  };

  return (
    <Container>
      <Top>
        <BackwardButton
          onClick={onClickBackward}
        />
      </Top>
      <SignUpSection>
        <Title>
          SIGN UP
        </Title>
        <Form onSubmit={handleSubmit(submit)}>
          <SignUpFormTextInput
            htmlFor="input-name"
            labelName="성함"
            id="input-name"
            type="text"
            placeholder="2-10자 사이 한글을 입력해주세요."
            formError={formError}
            register={register}
            name="name"
            requiredErrorMessage="성함을 입력해주세요."
            patternValue={/^[가-힣]{2,10}$/}
            patternErrorMessage="2-10자 사이 한글만 사용 가능합니다."
            clearErrors={clearErrors}
            isTargetOfServerError={false}
            clearServerError={clearServerError}
            serverErrorMessageToSeen={null}
            serverErrorOccured={serverError}
          />
          <SignUpFormTextInput
            htmlFor="input-username"
            labelName="아이디"
            id="input-username"
            type="text"
            placeholder="영문 소문자/숫자를 포함해 4~16자 사이로 입력해주세요."
            formError={formError}
            register={register}
            name="username"
            requiredErrorMessage="아이디를 입력해주세요."
            patternValue={/^(?=.*[a-z])(?=.*\d)[a-z\d]{4,16}$/}
            patternErrorMessage="영문 소문자/숫자를 포함해 4~16자만 사용 가능합니다."
            clearErrors={clearErrors}
            isTargetOfServerError
            clearServerError={clearServerError}
            serverErrorMessageToSeen="이미 등록된 아이디입니다."
            serverErrorOccured={serverError}
          />
          <SignUpFormTextInput
            htmlFor="input-password"
            labelName="비밀번호"
            id="input-password"
            type="password"
            placeholder="영문(대소문자), 숫자, 특수문자를 포함해 8글자 이상으로 입력해주세요."
            formError={formError}
            register={register}
            name="password"
            requiredErrorMessage="비밀번호를 입력해주세요."
            patternValue={/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d(?=.*@$!%*#?&)]{8,}$/}
            patternErrorMessage="8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 합니다."
            clearErrors={clearErrors}
            isTargetOfServerError={false}
            clearServerError={clearServerError}
            serverErrorMessageToSeen={null}
            serverErrorOccured={serverError}
          />
          <SignUpFormTextInput
            htmlFor="input-confirm-password"
            labelName="비밀번호 확인"
            id="input-confirm-password"
            type="password"
            placeholder="비밀번호 확인"
            formError={formError}
            register={register}
            name="confirmPassword"
            requiredErrorMessage="비밀번호 확인을 입력해주세요."
            patternValue={null}
            patternErrorMessage={null}
            clearErrors={clearErrors}
            isTargetOfServerError
            clearServerError={clearServerError}
            serverErrorMessageToSeen="비밀번호 확인이 일치하지 않습니다."
            serverErrorOccured={serverError}
          />
          <SignUpFormGenderRadioButton
            formError={formError}
            register={register}
            clearErrors={clearErrors}
          />
          <SignUpFormTextInput
            htmlFor="input-phone-number"
            labelName="전화번호"
            id="input-phone-number"
            type="tel"
            placeholder="11자리 전화번호를 입력해주세요. (01012345678)"
            formError={formError}
            register={register}
            name="phoneNumber"
            requiredErrorMessage="전화번호를 입력해주세요"
            patternValue={/^\d{11}$/}
            patternErrorMessage="11자리 전화번호 숫자를 입력해야 합니다. (01012345678)"
            clearErrors={clearErrors}
            isTargetOfServerError={false}
            clearServerError={clearServerError}
            serverErrorMessageToSeen={null}
            serverErrorOccured={serverError}
          />
          <SecondaryButton
            type="submit"
          >
            회원가입
          </SecondaryButton>
        </Form>
      </SignUpSection>
    </Container>
  );
}
