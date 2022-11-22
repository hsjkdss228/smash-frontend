import styled from 'styled-components';

const Container = styled.section`
  padding: 1em;
  border: 1px solid #000;
`;

const Title = styled.p`
  font-size: 1.5em;
  text-align: center;
  margin-bottom: .5em;
`;

const Applicant = styled.li`
  font-size: 1em;
  text-align: center;
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  align-items: center;
  margin-bottom: .4em;
`;

const ApplicantInformation = styled.div`
  display: flex;
  gap: .75em;
`;

const Buttons = styled.div`
  button {
    border: 1px solid #000;
    margin-left: .3em;
  }
`;

export default function PostGameApplicantsInformation({
  applicants,
  acceptRegister,
  rejectRegister,
}) {
  const handleClickAcceptRegister = (applicantId) => {
    acceptRegister(applicantId);
  };

  const handleClickRejectRegister = (applicantId) => {
    rejectRegister(applicantId);
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
      <Title>신청자 정보</Title>
      <ul>
        {applicants.map((applicant) => (
          <Applicant key={applicant.id}>
            <ApplicantInformation>
              <p>{applicant.name}</p>
              <p>{applicant.gender}</p>
              <p>{applicant.phoneNumber}</p>
            </ApplicantInformation>
            <Buttons>
              <button
                type="button"
                onClick={() => handleClickAcceptRegister(applicant.id)}
              >
                수락
              </button>
              <button
                type="button"
                onClick={() => handleClickRejectRegister(applicant.id)}
              >
                거절
              </button>
            </Buttons>
          </Applicant>
        ))}
      </ul>
    </Container>
  );
}
