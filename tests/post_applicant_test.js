Feature('2-a-i. 운동 모집 게시글 상세 정보 보기 (신청자 관점): '
  + '운동 팀을 찾는 사람이 '
  + '게시글의 작성자는 누구인지, 운동에는 누가 참가하는지 자세히 알기 위해 '
  + '모집 게시글의 상세 내용을 확인할 수 있다.');

Before(({ I }) => {
  I.clearDatabases();
});

Scenario('비로그인 상태에서 게시글 상세 정보 보기 (여석이 있는 경우)', ({ I }) => {
  // Given
  I.setupPostNotLoggedInAndNotFull();

  // When
  I.amOnPage('/posts/1');

  // Then
  I.see('축구');
  I.see('2022년 11월 13일 오후 03:00 ~ 오후 06:00');
  I.see('상암월드컵경기장');
  I.see('2/4명 참가');
  // TODO: 작성시간 로직 추가 시 인수 테스트도 수정 필요
  // I.see('작성시간');
  I.see('100 조회');

  I.see('사용자');
  I.see('010-1234-5678');
  I.see('평점: 10');
  I.see('프로필 확인하기');

  I.see('게시글 내용');

  I.see('장소 정보');
  I.see('상암월드컵경기장');
  I.see('서울 마포구 월드컵로 240');
  I.see('02-8765-4321');

  I.see('참가자 정보');
  I.see('사용자 1');
  I.see('여성');
  I.see('010-1234-5678');
  I.see('평점: 10');
  I.see('사용자 2');
  I.see('남성');
  I.see('010-2345-6789');
  I.see('평점: 9.9');

  I.see('참가를 신청하려면 로그인이 필요합니다.');
  I.see('로그인하기');
  I.see('체험 계정 선택하기');

  I.click('로그인하기');
  I.seeLoginPage();
  // TODO: 체험 계정 선택하기 버튼 클릭 시 체험 계정 선택 페이지로 이동
});

Scenario('비로그인 상태에서 게시글 상세 정보 보기 (여석이 없는 경우)', ({ I }) => {
  // Given
  I.setupPostNotLoggedInAndFull();

  // When
  I.amOnPage('/posts/1');

  // Then
  I.see('참가 정원이 모두 찼습니다.');
});

Scenario('참가 신청하지 않은 게시글 상세 정보 보기 (여석이 있는 경우)', ({ I }) => {
  // Given
  I.setupPostNotApplicantAndNotFull();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/posts/1');

  // Then
  I.see('참가 신청하기');
});

Scenario('참가 신청하지 않은 게시글 상세 정보 보기 (여석이 없는 경우)', ({ I }) => {
  // Given
  I.setupPostNotApplicantAndFull();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/posts/1');

  // Then
  I.see('참가 정원이 모두 찼습니다.');
});

Scenario('참가 신청한 게시글 상세 정보 보기', ({ I }) => {
  // Given
  I.setupPostApplicant();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/posts/1');

  // Then
  I.see('신청 취소하기');
});

Scenario('참가 예정인 게시글 상세 정보 보기', ({ I }) => {
  // Given
  I.setupPostMember();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/posts/1');

  // Then
  I.see('참가 취소하기');
});
