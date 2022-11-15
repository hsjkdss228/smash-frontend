import styled from 'styled-components';

const Container = styled.section`
  
`;

export default function PostGameInformation({
  type,
  date,
  place,
  currentMemberCount,
  targetMemberCount,
}) {
  return (
    <Container>
      <p>
        종목:
        {' '}
        {type}
      </p>
      <p>
        날짜:
        {' '}
        {date}
      </p>
      <p>
        장소:
        {' '}
        {place}
      </p>
      <p>
        참가인원:
        {' '}
        {currentMemberCount}
        /
        {targetMemberCount}
        명
      </p>
    </Container>
  );
}
