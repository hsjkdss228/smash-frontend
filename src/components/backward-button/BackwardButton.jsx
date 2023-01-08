import styled from 'styled-components';

import backIconUrl from '../assets/images/Back.png';

const Button = styled.button`
  font-size: 1em;
  display: flex;
  gap: 1em;
`;

export default function BackwardButton({
  onClick,
}) {
  return (
    <Button
      type="button"
      onClick={onClick}
    >
      <img
        src={backIconUrl}
        alt="뒤로 가기 아이콘"
      />
      <p>
        뒤로가기
      </p>
    </Button>
  );
}
