import styled from 'styled-components';

const Error = styled.p`
  font-size: 1.3em;
  text-align: center;
`;

export default function LoginErrors({
  loginFormError,
  loginProcessError,
}) {
  if (!Object.keys(loginFormError).length && !loginProcessError) {
    return (
      null
    );
  }

  if (Object.keys(loginFormError).length >= 1) {
    return (
      <div>
        {loginFormError.identifier ? (
          <Error>{loginFormError.identifier.message}</Error>
        ) : (
          <Error>{loginFormError.password.message}</Error>
        )}
      </div>
    );
  }

  return (
    <Error>{loginProcessError}</Error>
  );
}
