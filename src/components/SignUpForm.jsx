/* eslint-disable no-nested-ternary */

import styled from 'styled-components';

import Container from './ui/ComponentFullHeightScreenContainer';
import BackwardButton from './BackwardButton';
import SecondaryButton from './ui/SecondaryButton';

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

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: .5em;
`;

const RadioButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5em;
`;

const InputLabel = styled.label`
  font-size: 1em;
  margin-bottom: .3em;
  color: #A0A0A0;
`;

const RadioButtonLabel = styled.label`
  margin-inline: .2em 1em;
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

const SelectGender = styled.div`
  height: 2em;
  display: flex;
  align-items: center;
  gap: 2em;

  p {
    margin-right: 2em;
  }

  input {
    margin: 0;
  }
`;

const Input = styled.input`
  font-size: .9em;
  padding: 1.2em .7em;
  border: ${({ hasErrors }) => (
    hasErrors ? '1px solid #f00' : '1px solid #D8D8D8'
  )};
  margin-bottom: .3em;

  :focus {
    outline: none;
  }

  ::placeholder {
    font-size: .8em;
    color: #A0A0A0;
  }
`;

const ErrorDiv = styled.div`
  height: 2em;
`;

const Error = styled.p`
  font-size: .8em;
  color: #f00;
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
          <InputDiv>
            <InputLabel htmlFor="input-name">
              성함
            </InputLabel>
            <Input
              id="input-name"
              type="text"
              placeholder="2-10자 사이 한글을 입력해주세요."
              hasErrors={formError.name}
              {...register(
                'name',
                {
                  required: { value: true, message: '성함을 입력해주세요.' },
                  pattern: {
                    value: /^[가-힣]{2,10}$/,
                    message: '2-10자 사이 한글만 사용 가능합니다.',
                  },
                },
              )}
              onChange={() => clearErrors('name')}
            />
            <ErrorDiv>
              {formError.name ? (
                <Error>{formError.name.message}</Error>
              ) : (
                null
              )}
            </ErrorDiv>
          </InputDiv>
          <InputDiv>
            <InputLabel htmlFor="input-username">
              아이디
            </InputLabel>
            <Input
              id="input-username"
              type="text"
              placeholder="영문 소문자/숫자를 포함해 4~16자 사이로 입력해주세요."
              hasErrors={formError.username}
              {...register(
                'username',
                {
                  required: { value: true, message: '아이디를 입력해주세요.' },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,16}$/,
                    message: '영문 소문자/숫자를 포함해 4~16자만 사용 가능합니다.',
                  },
                },
              )}
              onChange={() => {
                clearErrors('username');
                clearServerError();
              }}
            />
            <ErrorDiv>
              {formError.username ? (
                <Error>{formError.username.message}</Error>
              ) : serverError === '이미 등록된 아이디입니다.' ? (
                <Error>{serverError}</Error>
              ) : (
                null
              )}
            </ErrorDiv>
          </InputDiv>
          <InputDiv>
            <InputLabel htmlFor="input-password">
              비밀번호
            </InputLabel>
            <Input
              id="input-password"
              type="password"
              placeholder="영문(대소문자), 숫자, 특수문자를 포함해 8글자 이상으로 입력해주세요."
              hasErrors={formError.password}
              {...register(
                'password',
                {
                  required: { value: true, message: '비밀번호를 입력해주세요.' },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d(?=.*@$!%*#?&)]{8,}$/,
                    message: '8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 합니다.',
                  },
                },
              )}
              onChange={() => clearErrors('password')}
            />
            <ErrorDiv>
              {formError.password ? (
                <Error>{formError.password.message}</Error>
              ) : (
                null
              )}
            </ErrorDiv>
          </InputDiv>
          <InputDiv>
            <InputLabel htmlFor="input-confirm-password">
              비밀번호 확인
            </InputLabel>
            <Input
              id="input-confirm-password"
              type="password"
              placeholder="비밀번호 확인"
              hasErrors={formError.confirmPassword}
              {...register(
                'confirmPassword',
                { required: { value: true, message: '비밀번호 확인을 입력해주세요.' } },
              )}
              onChange={() => {
                clearErrors('confirmPassword');
                clearServerError();
              }}
            />
            <ErrorDiv>
              {formError.confirmPassword ? (
                <Error>{formError.confirmPassword.message}</Error>
              ) : serverError === '비밀번호 확인이 일치하지 않습니다.' ? (
                <Error>{serverError}</Error>
              ) : (null)}
            </ErrorDiv>
          </InputDiv>
          <RadioButtonDiv>
            <SelectGender>
              <p>
                성별
              </p>
              <div>
                <input
                  id="input-gender-male"
                  type="radio"
                  value="남성"
                  {...register(
                    'gender',
                    { required: { value: true, message: '성별을 선택해주세요' } },
                  )}
                  onChange={() => clearErrors('gender')}
                />
                <RadioButtonLabel htmlFor="input-gender-male">
                  남성
                </RadioButtonLabel>
              </div>
              <div>
                <input
                  id="input-gender-female"
                  type="radio"
                  value="여성"
                  {...register(
                    'gender',
                    { required: { value: true, message: '성별을 선택해주세요.' } },
                  )}
                  onChange={() => clearErrors('gender')}
                />
                <RadioButtonLabel htmlFor="input-gender-female">
                  여성
                </RadioButtonLabel>
              </div>
            </SelectGender>
            <ErrorDiv>
              {formError.gender ? (
                <Error>{formError.gender.message}</Error>
              ) : (
                null
              )}
            </ErrorDiv>
          </RadioButtonDiv>
          <InputDiv>
            <InputLabel htmlFor="input-phone-number">
              전화번호
            </InputLabel>
            <Input
              id="input-phone-number"
              type="tel"
              placeholder="11자리 전화번호를 입력해주세요. (01012345678)"
              hasErrors={formError.phoneNumber}
              maxLength="11"
              {...register(
                'phoneNumber',
                {
                  required: { value: true, message: '전화번호를 입력해주세요' },
                  pattern: {
                    value: /^\d{11}$/,
                    message: '11자리 전화번호 숫자를 입력해야 합니다. (01012345678)',
                  },
                },
              )}
              onChange={() => clearErrors('phoneNumber')}
            />
            <ErrorDiv>
              {formError.phoneNumber ? (
                <Error>{formError.phoneNumber.message}</Error>
              ) : (
                null
              )}
            </ErrorDiv>
          </InputDiv>
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
