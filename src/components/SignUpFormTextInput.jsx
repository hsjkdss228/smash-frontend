/* eslint-disable no-nested-ternary */

import styled from 'styled-components';

const TextInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: .5em;
`;

const InputLabel = styled.label`
  font-size: 1em;
  margin-bottom: .3em;
  color: #A0A0A0;
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

export default function SignUpFormTextInput({
  htmlFor,
  labelName,
  id,
  type,
  placeholder,
  formError,
  register,
  name,
  requiredErrorMessage,
  patternValue,
  patternErrorMessage,
  clearErrors,
  isTargetOfServerError,
  clearServerError,
  serverErrorMessageToSeen,
  serverErrorOccured,
}) {
  return (
    <TextInput>
      <InputLabel htmlFor={htmlFor}>
        {labelName}
      </InputLabel>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        hasErrors={formError[name]}
        {...register(
          name,
          {
            required: { value: true, message: requiredErrorMessage },
            pattern: patternValue ? {
              value: patternValue,
              message: patternErrorMessage,
            } : null,
            onChange: () => {
              clearErrors(name);
              if (isTargetOfServerError) {
                clearServerError();
              }
            },
          },
        )}
      />
      <ErrorDiv>
        {formError[name] ? (
          <Error>{formError[name].message}</Error>
        ) : serverErrorOccured === serverErrorMessageToSeen ? (
          <Error>{serverErrorOccured}</Error>
        ) : (
          null
        )}
      </ErrorDiv>
    </TextInput>
  );
}
