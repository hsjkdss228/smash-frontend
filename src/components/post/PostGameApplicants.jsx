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
    seeConfirmModal({ message: '?????? ?????? ?????????' });
  };

  const rejectRegister = async () => {
    await registerStore.rejectRegister(applicantId);
    await fetchData();
    seeConfirmModal({ message: '?????? ?????? ?????????' });
  };

  const seeReconfirmModal = ({ action, message }) => {
    setActionName(action);
    setActionMessage(message);
    setReconfirmModalState(true);
  };

  const reconfirmRegisterReject = (targetApplicantId) => {
    setApplicantId(targetApplicantId);
    seeReconfirmModal({ action: 'registerReject', message: '?????? ????????? ??????' });
  };

  const handleClickRegisterAccept = (targetApplicantId) => {
    acceptRegister(targetApplicantId);
  };

  const handleClickRegisterReject = (targetApplicantId) => {
    reconfirmRegisterReject(targetApplicantId);
  };

  if (!applicants) {
    return (
      <p>????????? ???????????? ????????????...</p>
    );
  }

  return (
    <>
      <ComponentSectionContainer
        backgroundColor="#FFF"
      >
        <Title>
          ????????? ??????
        </Title>
        {applicants.length === 0 ? (
          <p>???????????? ????????????.</p>
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
                    alt="????????? ????????? ?????????"
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
                    ??????:
                    {' '}
                    {applicant.userInformation.mannerScore}
                  </Score>
                  <SeeProfile>
                    ????????? ????????????
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
                    ??????
                  </Button>
                  <Button
                    className="reject-button"
                    type="button"
                    onClick={() => (
                      handleClickRegisterReject(applicant.registerId)
                    )}
                  >
                    ??????
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
