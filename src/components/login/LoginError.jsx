/* eslint-disable no-nested-ternary */

import styled from 'styled-components';

const Container = styled.div`
  
`;

const Error = styled.p`
  font-size: .8em;
  text-align: center;
  margin-top: 3em;
  color: #F00;
`;

export default function LoginError({
  loginFormError,
  loginServerError,
}) {
  return (
    <Container>
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
    </Container>
  );
}
