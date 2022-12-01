/* eslint-disable no-nested-ternary */

import styled from 'styled-components';

const Container = styled.button`
  font-size: 1.05em;
  padding: 1em;
  border: 1px solid #000;
`;

const HitsAndType = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
`;

const DateAndPlace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1em;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MemberCountAndSeeDetail = styled.div`
  display: flex;
  align-items: center;
`;

const MemberCount = styled.p`
  margin-right: .5em;
`;

const SeeDetail = styled.p`
  font-size: .8em;
`;

const RegisterStatus = styled.div`
  text-align: right;
`;

export default function PostsContent({
  loggedIn,
  hits,
  isAuthor,
  type,
  date,
  place,
  currentMemberCount,
  targetMemberCount,
  registerStatus,
  onClickPost,
}) {
  const handleClickPostButton = () => {
    onClickPost();
  };

  return (
    <Container
      type="button"
      onClick={handleClickPostButton}
    >
      <HitsAndType>
        <p>
          {hits}
          {' '}
          hits
        </p>
        <p>{type}</p>
      </HitsAndType>
      <DateAndPlace>
        <p>{date}</p>
        <p>{place}</p>
      </DateAndPlace>
      <Bottom>
        <MemberCountAndSeeDetail>
          <MemberCount>
            {currentMemberCount}
            /
            {targetMemberCount}
            명 참가 중
          </MemberCount>
          <SeeDetail>상세 내용 보기</SeeDetail>
        </MemberCountAndSeeDetail>
        <RegisterStatus>
          {loggedIn ? (
            isAuthor ? (
              <p>내가 쓴 글</p>
            ) : registerStatus === 'processing' ? (
              <p>참가 신청 중</p>
            ) : registerStatus === 'accepted' ? (
              <p>참가 중</p>
            ) : null
          ) : null}
        </RegisterStatus>
      </Bottom>
    </Container>
  );
}
