import styled from 'styled-components';
import numberFormat from '../utils/numberFormat';

const Container = styled.section`
  
`;

const TopSection = styled.section`
  
`;

const TopLeftSection = styled.section`
  
`;

const TopRightSection = styled.section`
  
`;

const ContentSection = styled.section`
  
`;

const DetailSection = styled.section`
  
`;

const IconStyledSection = styled.section`
  
`;

export default function PostInformation({ information }) {
  return (
    <Container>
      <TopSection>
        <TopLeftSection>
          <p>{information.exerciseDate}</p>
          <p>{information.placeName}</p>
          <p>{`조회수: ${information.hits}회`}</p>
        </TopLeftSection>
        <TopRightSection>
          <p>{information.exercise}</p>
          <p>{information.postType}</p>
          <p>{`평균 매너점수: ${information.averageMannerScore}점`}</p>
        </TopRightSection>
      </TopSection>
      <ContentSection>
        <DetailSection>
          <p>{information.author}</p>
          <p>{information.createdAt}</p>
          <p>{information.detail}</p>
        </DetailSection>
        <IconStyledSection>
          <p>{information.exerciseType}</p>
          <p>{information.exerciseLevel}</p>
          <p>{information.exerciseGender}</p>
          <p>
            {information.currentTotalParticipants}
            /
            {information.targetTotalParticipantsCount}
            명
          </p>
          <p>{`참가비: ${numberFormat(information.cost)}원`}</p>
        </IconStyledSection>
      </ContentSection>
    </Container>
  );
}
