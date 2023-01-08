import styled from 'styled-components';

const Label = styled.label`
  display: none; 
`;

const Input = styled.input`
  width: 2em;

  ::placeholder {
    text-align: center;
  }
`;

export default function PostFormSelectTime({
  id,
  type,
  time,
  value,
  onChange,
}) {
  return (
    <div>
      <Label htmlFor={id}>
        {type}
        {' '}
        {time}
      </Label>
      <Input
        id={id}
        type="text"
        min={(
          time === 'hour'
            ? 1
            : 0
        )}
        max={(
          time === 'hour'
            ? 12
            : 59
        )}
        placeholder="00"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
