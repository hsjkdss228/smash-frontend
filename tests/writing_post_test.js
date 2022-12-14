Feature('4. 운동 모집 게시글 작성: '
  + '운동 팀원을 모집하는 사람이 '
  + '자신의 게시글을 운동을 찾는 사람들에게 노출시키기 위해 '
  + '운동 팀원을 모집하는 게시글을 작성할 수 있다.');

Before(({ I }) => {
  I.clearDatabases();
});

Scenario('장소 입력 (등록된 장소를 입력하는 경우)', ({ I }) => {
  // Given
  I.setupPlacesToWritePost();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/write');
  I.fillField('장소 이름 검색', '대전');
  I.click('대전 월드컵경기장');

  // Then
  I.seeElement('[value="대전 월드컵경기장"]');
  I.seeElement('[value="대전 유성구 월드컵대로 32"]');
});

Scenario('장소 입력 (사용자가 직접 장소를 입력하는 경우)', ({ I }) => {
  // Given
  I.setupWritingPostCase();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/write');
  I.click('직접 입력');
  I.fillField('장소 이름', '제주 월드컵경기장');
  I.fillField('장소 주소', '제주 서귀포시 월드컵로 33');

  // Then
  I.seeElement('[value="제주 월드컵경기장"]');
  I.seeElement('[value="제주 서귀포시 월드컵로 33"]');
});

Scenario('입력을 초기화하는 경우', ({ I }) => {
// Given
  I.setupWritingPostCase();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/write');
  I.fillPostForm();
  I.click('초기화');

  // Then
  I.see('정말로 입력 내용을 초기화하시겠습니까?');
  I.click('예');
  I.seeEmptyPostForms();
});

Scenario('정상적으로 게시글을 등록하는 경우', ({ I }) => {
  // Given
  I.setupWritingPostCase();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/write');
  I.fillPostForm();
  I.click('작성하기');

  // Then
  I.see('게시글 작성이 완료되었습니다');
  I.click('확인');

  I.see('축구');
  I.see('2023년 1월 28일 오전 10:00 ~ 오후 12:30');
  I.see('김천종합운동장');
  I.see('1/15명 참가 중');
  I.see('0 조회');
  I.see('내가 쓴 글');

  I.click('내가 쓴 글');
  I.see('사용자 1');
  I.see('상주 상무 선수단과 친선경기에 참여하실 분들을 모집합니다.');
  I.see('경북 김천시 삼락동 488-1');
  I.see('신청자가 없습니다.');
});

Scenario('종목을 입력하지 않은 경우', ({ I }) => {
  // Given
  I.setupWritingPostCase();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/write');
  I.fillPostForm();
  I.clearInputField('#input-game-exercise');
  I.click('작성하기');

  // Then
  I.seeElement('[placeholder="종목을 입력하지 않았습니다."]');
});

Scenario('시간을 입력하지 않은 경우', ({ I }) => {
  // Given
  I.setupWritingPostCase();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/write');
  I.fillPostForm();
  I.clearInputField('#input-game-start-hour');
  I.click('작성하기');

  // Then
  I.see('날짜 및 시간을 입력하지 않았습니다.');
});

Scenario('장소를 입력하지 않은 경우', ({ I }) => {
  // Given
  I.setupWritingPostCase();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/write');
  I.fillPostForm();
  I.click('직접 입력');
  I.click('작성하기');

  // Then
  I.seeElement('[placeholder="장소를 지정하지 않았습니다."]');
});

Scenario('모집 인원을 입력하지 않은 경우', ({ I }) => {
  // Given
  I.setupWritingPostCase();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/write');
  I.fillPostForm();
  I.clearInputField('#input-game-target-member-count');
  I.click('작성하기');

  // Then
  I.seeElement('[placeholder="모집 인원 수를 입력하지 않았습니다."]');
});

Scenario('상세 내용을 입력하지 않은 경우', ({ I }) => {
  // Given
  I.setupWritingPostCase();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/write');
  I.fillPostForm();
  I.clearInputField('#input-post-detail');
  I.click('작성하기');

  // Then
  I.seeElement('[placeholder="상세 내용을 입력하지 않았습니다."]');
});
