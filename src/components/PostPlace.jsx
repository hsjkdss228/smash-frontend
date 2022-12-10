import styled from 'styled-components';

import Container from './ui/ComponentSectionContainer';

const PlaceInformation = styled.div`
  
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 6fr 4fr;
  gap: 2em;
`;

const Title = styled.p`
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 1em;
`;

const Name = styled.p`
  font-size: .9em;
  font-weight: bold;
  margin-bottom: .5em;
`;

const Address = styled.address`
  font-size: .8em;
  line-height: 1.1;
  margin-bottom: 1em;
`;

const ContactNumber = styled.p`
  font-size: .8em;
`;

const PlaceMap = styled.section`
  
`;

const Map = styled.iframe`
  width: 100%;
  height: 7em;
  background-color: #D9D9D9;
`;

export default function PostPlace({
  name,
}) {
  return (
    <Container>
      <GridWrapper>
        <PlaceInformation>
          <Title>
            장소 정보
          </Title>
          <Name>
            {name}
          </Name>
          <Address>
            장소 주소는 두 줄로 입력됩니다. 장소 주소는 두 줄로 입력됩니다. 장소 주소는 두 줄
          </Address>
          <ContactNumber>
            02-0000-0000
          </ContactNumber>
        </PlaceInformation>
        <PlaceMap>
          <Map />
        </PlaceMap>
      </GridWrapper>
    </Container>
  );
}
