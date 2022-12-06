import styled from 'styled-components';

const Error = styled.p`
  font-size: 1.3em;
  text-align: center;
`;

export default function LoginErrors({
  loginFormError,
  loginServerError,
}) {
  if (!Object.keys(loginFormError).length && !loginServerError) {
    return (
      null
    );
  }

  if (Object.keys(loginFormError).length >= 1) {
    return (
      <div>
        {loginFormError.username ? (
          <Error>{loginFormError.username.message}</Error>
        ) : (
          <Error>{loginFormError.password.message}</Error>
        )}
      </div>
    );
  }

  return (
    <Error>{loginServerError}</Error>
  );
}
