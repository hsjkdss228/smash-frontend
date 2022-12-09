/* eslint-disable no-nested-ternary */

import styled from 'styled-components';

import noImageUrl from './assets/images/NoImage.png';

const Container = styled.button`
  font-size: 1em;
  padding: .625em;
  border: 1px solid #CCC;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1.7fr 4fr 1.7fr;
  background-color: #FFF;
`;

const Left = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #D9D9D9; 

  img {
    height: 25%;
  }
`;

const Middle = styled.div`
  margin: .5em 0 .5em 1em;
`;

const Type = styled.p`
  font-weight: bold;
  color: #FF7A63;
  text-align: left;
  margin-bottom: .9em;
`;

const DateAndPlace = styled.div`
  font-size: .8em;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Date = styled.p`
  
`;

const Place = styled.p`
  
`;

const MemberCountAndSeeDetail = styled.div`
  margin-top: 1em;
  display: flex;
  align-items: center;
`;

const MemberCount = styled.p`
  margin-right: 1em;
`;

const SeeDetail = styled.p`
  font-size: .8em;
`;

const Right = styled.div`
  height: 100%;
  padding: .5em .5em .5em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CreatedAtAndHits = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  font-size: .8em;

  p:first-child {
    margin-left: .8em;
  }
`;

const RegisterStatus = styled.div`
  color: #FF7A63;
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
      <Left>
        <img
          src={noImageUrl}
          alt="기본 이미지"
        />
      </Left>
      <Middle>
        <Type>
          {type}
        </Type>
        <DateAndPlace>
          <Date>{date}</Date>
          <Place>{place}</Place>
        </DateAndPlace>
        <MemberCountAndSeeDetail>
          <MemberCount>
            {currentMemberCount}
            /
            {targetMemberCount}
            명 참가 중
          </MemberCount>
          <SeeDetail>
            자세히 보기
          </SeeDetail>
        </MemberCountAndSeeDetail>
      </Middle>
      <Right>
        <CreatedAtAndHits>
          <p>
            {hits}
            {' '}
            hits
          </p>
          <p>
            1시간 전
          </p>
        </CreatedAtAndHits>
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
      </Right>
    </Container>
  );
}
