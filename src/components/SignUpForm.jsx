/* eslint-disable no-nested-ternary */

import styled from 'styled-components';
import BackwardButton from './ui/BackwardButton';

const Container = styled.article`
  padding-block: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 1em;
`;

const Input = styled.input`
  font-size: 1.3em;
`;

const Error = styled.p`
  color: #f00;
`;

const FormGuide = styled.p`
  color: #aaa;
`;

const Button = styled.button`
  font-size: 1.3em;
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
      <BackwardButton
        type="button"
        onClick={onClickBackward}
      >
        ⬅️
      </BackwardButton>
      <Form onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor="input-name">
            이름
          </label>
          <Input
            id="input-name"
            type="text"
            {...register(
              'name',
              {
                required: { value: true, message: '이름을 입력해주세요.' },
                pattern: {
                  value: /^[가-힣]{2,10}$/,
                  message: '2-10자 사이 한글만 사용 가능합니다.',
                },
              },
            )}
            onChange={() => clearErrors('name')}
          />
          {formError.name ? (
            <Error>{formError.name.message}</Error>
          ) : (
            <FormGuide>2-10자 사이 한글을 입력해주세요.</FormGuide>
          )}
        </div>
        <div>
          <label htmlFor="input-username">
            아이디
          </label>
          <Input
            id="input-username"
            type="text"
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
          {formError.username ? (
            <Error>{formError.username.message}</Error>
          ) : serverError === '이미 등록된 아이디입니다.' ? (
            <Error>{serverError}</Error>
          ) : (
            <FormGuide>영문 소문자/숫자를 포함해 4~16자 사이로 입력해주세요.</FormGuide>
          )}
        </div>
        <div>
          <label htmlFor="input-password">
            비밀번호
          </label>
          <Input
            id="input-password"
            type="password"
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
          {formError.password ? (
            <Error>{formError.password.message}</Error>
          ) : (
            <FormGuide>영문(대소문자), 숫자, 특수문자를 포함해 8글자 이상으로 입력해주세요.</FormGuide>
          )}
        </div>
        <div>
          <label htmlFor="input-confirm-password">
            비밀번호 확인
          </label>
          <Input
            id="input-confirm-password"
            type="password"
            {...register(
              'confirmPassword',
              { required: { value: true, message: '비밀번호 확인을 입력해주세요.' } },
            )}
            onChange={() => {
              clearErrors('confirmPassword');
              clearServerError();
            }}
          />
          {formError.confirmPassword ? (
            <Error>{formError.confirmPassword.message}</Error>
          ) : serverError === '비밀번호 확인이 일치하지 않습니다.' ? (
            <Error>{serverError}</Error>
          ) : (null)}
        </div>
        <div>
          <p>
            성별
          </p>
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
          <label htmlFor="input-gender-male">
            남성
          </label>
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
          <label htmlFor="input-gender-female">
            여성
          </label>
          {formError.gender ? (
            <Error>{formError.gender.message}</Error>
          ) : (
            null
          )}
        </div>
        <div>
          <label htmlFor="input-phone-number">
            전화번호
          </label>
          <Input
            id="input-phone-number"
            type="tel"
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
          {formError.phoneNumber ? (
            <Error>{formError.phoneNumber.message}</Error>
          ) : (
            <FormGuide>11자리 전화번호를 입력해주세요. (01012345678)</FormGuide>
          )}
        </div>
        <Button
          type="submit"
        >
          회원가입
        </Button>
      </Form>
    </Container>
  );
}
