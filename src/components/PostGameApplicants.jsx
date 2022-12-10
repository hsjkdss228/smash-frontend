import styled from 'styled-components';

import userProfileImage from './assets/images/UserProfile.png';

import Container from './ui/ComponentSectionContainer';
import Button from './ui/PrimaryButton';

const Title = styled.p`
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 1em;
`;

const Applicant = styled.li`
  margin: 0 1em 1em;
  display: grid;
  grid-template-columns: 1fr 3fr 2fr 3fr;
  align-items: center;
`;

const ApplicantProfile = styled.div`
  font-size: .3em;
  margin-right: 2em;

  img {
    width: 12em;
  }
`;

const ApplicantInformation = styled.div`
  margin-left: .5em;
  display: flex;
  flex-direction: column;
  gap: .3em;
`;

const NameAndGender = styled.div`
  display: flex;
  gap: 1em;
`;

const PhoneNumber = styled.div`
  
`;

const ApplicantScoreAndSeeProfile = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`;

const Score = styled.p`
  font-size: .8em;
  margin-bottom: .5em;
`;

const SeeProfile = styled.button`
  font-size: .9em;
  padding: 0;
  text-align: right;

  :hover {
    color: #FF7A63;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default function PostGameApplicants({
  applicants,
  cannotAcceptRegister,
  onClickAcceptRegister,
  onClickRejectRegister,
}) {
  const handleClickAcceptRegister = (applicantId) => {
    onClickAcceptRegister(applicantId);
  };

  const handleClickRejectRegister = (applicantId) => {
    onClickRejectRegister(applicantId);
  };

  if (!applicants) {
    return (
      <p>정보를 불러오고 있습니다...</p>
    );
  }

  if (applicants.length === 0) {
    return (
      <Container>
        <Title>신청자 정보</Title>
        <p>신청자가 없습니다.</p>
      </Container>
    );
  }

  return (
    <Container>
      <Title>
        신청자 정보
      </Title>
      <ul>
        {applicants.map((applicant) => (
          <Applicant key={applicant.id}>
            <ApplicantProfile>
              <img
                src={userProfileImage}
                alt="사용자 프로필 이미지"
              />
            </ApplicantProfile>
            <ApplicantInformation>
              <NameAndGender>
                <p>{applicant.name}</p>
                <p>{applicant.gender}</p>
              </NameAndGender>
              <PhoneNumber>
                <p>{applicant.phoneNumber}</p>
              </PhoneNumber>
            </ApplicantInformation>
            <ApplicantScoreAndSeeProfile>
              <Score>
                신청자 평점
              </Score>
              <SeeProfile>
                프로필 확인하기
              </SeeProfile>
            </ApplicantScoreAndSeeProfile>
            <Buttons>
              <Button
                type="button"
                disabled={cannotAcceptRegister}
                onClick={() => handleClickAcceptRegister(applicant.id)}
              >
                수락
              </Button>
              <Button
                type="button"
                onClick={() => handleClickRejectRegister(applicant.id)}
              >
                거절
              </Button>
            </Buttons>
          </Applicant>
        ))}
      </ul>
    </Container>
  );
}
