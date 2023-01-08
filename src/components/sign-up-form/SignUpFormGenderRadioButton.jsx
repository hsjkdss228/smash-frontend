/* eslint-disable no-nested-ternary */

import styled from 'styled-components';

const RadioButtonInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5em;
`;

const RadioButtonLabel = styled.label`
  margin-inline: .2em 1em;
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

const ErrorDiv = styled.div`
  height: 2em;
`;

const Error = styled.p`
  font-size: .8em;
  color: #f00;
`;

export default function SignUpFormGenderRadioButton({
  formError,
  register,
  clearErrors,
}) {
  return (
    <RadioButtonInput>
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
              {
                required: { value: true, message: '성별을 선택해주세요' },
                onChange: () => clearErrors('gender'),
              },
            )}
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
              {
                required: { value: true, message: '성별을 선택해주세요' },
                onChange: () => clearErrors('gender'),
              },
            )}
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
    </RadioButtonInput>
  );
}
