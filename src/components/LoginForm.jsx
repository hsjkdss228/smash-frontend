/* eslint-disable react/jsx-props-no-spreading */

import styled from 'styled-components';

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

  label {
    display: none;
  }
`;

const Input = styled.input`
  font-size: 1.3em;
`;

const Button = styled.button`
  font-size: 1.3em;
`;

export default function LoginForm({
  register,
  handleSubmit,
  login,
}) {
  const submit = async (data) => {
    await login(data);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor="input-identifier">
            아이디
          </label>
          <Input
            id="input-identifier"
            type="text"
            placeholder="아이디"
            {...register(
              'identifier',
              { required: { value: true, message: '아이디를 입력해주세요.' } },
            )}
          />
        </div>
        <div>
          <label htmlFor="input-password">
            비밀번호
          </label>
          <Input
            id="input-password"
            type="password"
            placeholder="비밀번호"
            {...register(
              'password',
              { required: { value: true, message: '비밀번호를 입력해주세요.' } },
            )}
          />
        </div>
        <Button
          type="submit"
        >
          로그인
        </Button>
      </Form>
    </Container>
  );
}