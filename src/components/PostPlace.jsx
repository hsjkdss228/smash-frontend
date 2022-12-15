import styled from 'styled-components';

import usePlaceStore from '../hooks/usePlaceStore';

import ComponentSectionContainer from './ui/ComponentSectionContainer';

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

export default function PostPlace() {
  const placeStore = usePlaceStore();

  const { place } = placeStore;

  return (
    <ComponentSectionContainer
      backgroundColor="#FFF"
    >
      <GridWrapper>
        <PlaceInformation>
          <Title>
            장소 정보
          </Title>
          <Name>
            {place.name}
          </Name>
          <Address>
            {place.address}
          </Address>
          <ContactNumber>
            {place.contactNumber}
          </ContactNumber>
        </PlaceInformation>
        <PlaceMap>
          <Map />
        </PlaceMap>
      </GridWrapper>
    </ComponentSectionContainer>
  );
}
