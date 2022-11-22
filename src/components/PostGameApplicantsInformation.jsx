import styled from 'styled-components';

const Container = styled.section`
  margin-block: 1em;
`;

const Applicant = styled.li`
  display: flex;
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
      <p>신청자가 없습니다.</p>
    );
  }

  return (
    <Container>
      <p>신청자 정보</p>
      <ul>
        {applicants.map((applicant) => (
          <Applicant key={applicant.id}>
            <p>{applicant.name}</p>
            <p>{applicant.gender}</p>
            <p>{applicant.phoneNumber}</p>
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
          </Applicant>
        ))}
      </ul>
    </Container>
  );
}
