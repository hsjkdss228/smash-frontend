Feature('게시글 상세 정보 보기');

Before(({ I }) => {
  I.clearPosts();
});

Scenario('신청자 관점: 참가 신청하지 않은 게시글 상세 정보 보기', ({ I }) => {
  // Given
  I.setupMembersNotFinished();
  I.login({ userId: 5 });

  // When
  I.amOnPage('/');
  I.click('운동 찾기');
  I.click('배드민턴');

  // Then
  I.see('작성자: 작성자 이름');
  I.see('작성자 연락처: 010-0000-0001');
  I.see('2/4명');
  I.see('참가자 정보');
  I.see('사용자 2');
  I.dontSee('사용자 3');
  I.dontSee('사용자 4');
  I.see('신청');
});

Scenario('신청자 관점: 참가 신청하지 않은 게시글 상세 정보 보기 (남은 자리가 없는 경우)', ({ I }) => {
  // Given
  I.setupMembersFinished();
  I.login({ userId: 5 });

  // When
  I.amOnPage('/');
  I.click('운동 찾기');
  I.click('배드민턴');

  // Then
  I.see('4/4명');
  I.see('사용자 4');
  I.dontSee('신청');
  I.see('남은 자리가 없습니다.');
});

Scenario('신청자 관점: 참가 신청한 게시글 상세 정보 보기', ({ I }) => {
  // Given
  I.setupMembersWhenRegistered();
  I.login({ userId: 2 });

  // When
  I.amOnPage('/');
  I.click('운동 찾기');
  I.click('배드민턴');

  // Then
  I.see('3/4명');
  I.see('신청취소');
});

Scenario('작성자 관점: 작성한 게시글 상세 정보 보기 (신청자가 있는 경우)', ({ I }) => {
  // Given
  I.setupMembersWithApplicants();
  I.login({ userId: 1 });

  // When
  I.amOnPage('/');
  I.click('운동 찾기');
  I.click('배드민턴');

  // Then
  I.see('수락');
  I.see('거절');
});

Scenario('작성자 관점: 작성한 게시글 상세 정보 보기 (신청자가 없는 경우)', ({ I }) => {
  // Given
  I.setupMembersWithoutApplicants();
  I.login({ userId: 1 });

  // When
  I.amOnPage('/');
  I.click('운동 찾기');
  I.click('배드민턴');

  // Then
  I.see('신청자가 없습니다.');
});
