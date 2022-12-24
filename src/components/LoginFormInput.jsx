import styled from 'styled-components';

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

export default function LoginFormInput({
  htmlFor,
  labelName,
  id,
  type,
  placeholder,
  register,
  name,
  requiredErrorMessage,
  clearErrors,
}) {
  return (
    <div>
      <label htmlFor={htmlFor}>
        {labelName}
      </label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(
          name,
          {
            required: { value: true, message: requiredErrorMessage },
            onChange: clearErrors,
          },
        )}
      />
    </div>
  );
}
