import styled from 'styled-components';
import BackwardButton from './BackwardButton';

import Container from './ui/ComponentScreenContainer';

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
  onClickBackward,
  onClickSignUp,
  register,
  handleSubmit,
  login,
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
      <BackwardButton
        onClick={handleClickBackward}
      />
      <Form onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor="input-username">
            아이디
          </label>
          <Input
            id="input-username"
            type="text"
            placeholder="아이디"
            {...register(
              'username',
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
      <button
        type="button"
        onClick={handleClickSignUp}
      >
        회원가입
      </button>
    </Container>
  );
}
