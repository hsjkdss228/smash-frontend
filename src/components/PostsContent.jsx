/* eslint-disable no-nested-ternary */

import { useEffect } from 'react';

import styled from 'styled-components';

import { useLocalStorage } from 'usehooks-ts';

import { postApiService } from '../services/PostApiService';

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
    height: 7em;
    width: 10em;
    object-fit: cover;
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
  imageUrl,
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
  const [accessToken] = useLocalStorage('accessToken', '');
  const loggedIn = accessToken !== '';

  useEffect(() => {
    postApiService.setAccessToken(accessToken);
  }, [accessToken]);

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
          src={imageUrl}
          alt="썸네일 이미지"
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
            조회
          </p>
          {/* <p>
            1시간 전
          </p> */}
        </CreatedAtAndHits>
        <RegisterStatus>
          {loggedIn ? (
            isAuthor ? (
              <p>내가 쓴 글</p>
            ) : registerStatus === 'processing' ? (
              <p>참가 신청 중</p>
            ) : registerStatus === 'accepted' ? (
              <p>참가 예정</p>
            ) : null
          ) : null}
        </RegisterStatus>
      </Right>
    </Container>
  );
}
