import { useState } from 'react';
import styled from 'styled-components';
import useGameStore from '../../hooks/useGameStore';
import useRegisterStore from '../../hooks/useRegisterStore';

import ModalConfirm from '../modal/ModalConfirm';
import ModalReconfirm from '../modal/ModalReconfirm';

import ComponentSectionContainer from '../ui/ComponentSectionContainer';
import Button from '../ui/PrimaryButton';

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
    height: 12em;
    width: 12em;
    border-radius: 100%;
    object-fit: cover;
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
  fetchData,
}) {
  const [actionName, setActionName] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [applicantId, setApplicantId] = useState(0);
  const [confirmModalState, setConfirmModalState] = useState(false);
  const [reconfirmModalState, setReconfirmModalState] = useState(false);

  const gameStore = useGameStore();
  const registerStore = useRegisterStore();

  const { game } = gameStore;
  const cannotAcceptRegister = (
    game.currentMemberCount >= game.targetMemberCount
  );
  const { applicants } = registerStore;

  const seeConfirmModal = ({ message }) => {
    setActionMessage(message);
    setConfirmModalState(true);
  };

  const acceptRegister = async (targetApplicantId) => {
    await registerStore.acceptRegister(targetApplicantId);
    await fetchData();
    seeConfirmModal({ message: '참가 신청 수락이' });
  };

  const rejectRegister = async () => {
    await registerStore.rejectRegister(applicantId);
    await fetchData();
    seeConfirmModal({ message: '참가 신청 거절이' });
  };

  const seeReconfirmModal = ({ action, message }) => {
    setActionName(action);
    setActionMessage(message);
    setReconfirmModalState(true);
  };

  const reconfirmRegisterReject = (targetApplicantId) => {
    setApplicantId(targetApplicantId);
    seeReconfirmModal({ action: 'registerReject', message: '참가 신청을 거절' });
  };

  const handleClickRegisterAccept = (targetApplicantId) => {
    acceptRegister(targetApplicantId);
  };

  const handleClickRegisterReject = (targetApplicantId) => {
    reconfirmRegisterReject(targetApplicantId);
  };

  if (!applicants) {
    return (
      <p>정보를 불러오고 있습니다...</p>
    );
  }

  return (
    <>
      <ComponentSectionContainer
        backgroundColor="#FFF"
      >
        <Title>
          신청자 정보
        </Title>
        {applicants.length === 0 ? (
          <p>신청자가 없습니다.</p>
        ) : (
          <ul>
            {applicants.map((applicant) => (
              <Applicant
                className="applicant"
                key={applicant.registerId}
              >
                <ApplicantProfile>
                  <img
                    src={applicant.userInformation.profileImageUrl}
                    alt="사용자 프로필 이미지"
                  />
                </ApplicantProfile>
                <ApplicantInformation>
                  <NameAndGender>
                    <p>{applicant.userInformation.name}</p>
                    <p>{applicant.userInformation.gender}</p>
                  </NameAndGender>
                  <PhoneNumber>
                    <p>{applicant.userInformation.phoneNumber}</p>
                  </PhoneNumber>
                </ApplicantInformation>
                <ApplicantScoreAndSeeProfile>
                  <Score>
                    평점:
                    {' '}
                    {applicant.userInformation.mannerScore}
                  </Score>
                  <SeeProfile>
                    프로필 확인하기
                  </SeeProfile>
                </ApplicantScoreAndSeeProfile>
                <Buttons>
                  <Button
                    className="accept-button"
                    type="button"
                    disabled={cannotAcceptRegister}
                    onClick={() => (
                      handleClickRegisterAccept(applicant.registerId)
                    )}
                  >
                    수락
                  </Button>
                  <Button
                    className="reject-button"
                    type="button"
                    onClick={() => (
                      handleClickRegisterReject(applicant.registerId)
                    )}
                  >
                    거절
                  </Button>
                </Buttons>
              </Applicant>
            ))}
          </ul>
        )}
      </ComponentSectionContainer>
      {confirmModalState && (
        <ModalConfirm
          actionMessage={actionMessage}
          confirmModalState={confirmModalState}
          setConfirmModalState={setConfirmModalState}
        />
      )}
      {reconfirmModalState && (
        <ModalReconfirm
          action={(
            actionName === 'registerReject'
              ? rejectRegister
              : acceptRegister
          )}
          actionMessage={actionMessage}
          reconfirmModalState={reconfirmModalState}
          setReconfirmModalState={setReconfirmModalState}
        />
      )}
    </>
  );
}
