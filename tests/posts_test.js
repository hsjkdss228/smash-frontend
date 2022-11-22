Feature('게시글 목록 보기');

Before(({ I }) => {
  I.clearPosts();
});

Scenario('등록된 게시글이 없는 경우', ({ I }) => {
  // Given
  I.login({ userId: 1 });

  // When
  I.amOnPage('/posts/list');

  // Then
  I.see('등록된 게시물이 존재하지 않습니다.');
});

Scenario('등록된 게시글이 존재하는 경우 (작성자 관점)', ({ I }) => {
  // Given
  I.setupPosts();
  I.setupMembersPosts();
  I.login({ userId: 1 });

  // When
  I.amOnPage('/');
  I.click('운동 찾기');

  // Then
  I.see('축구');
  I.see('2022년 11월 13일 15:00~17:00');
  I.see('잠실종합운동장');
  I.see('2/4명');
  I.see('조회수: 123');

  I.see('배구');
  I.see('2022년 11월 14일 15:00~17:00');
  I.see('장충체육관');
  I.see('2/4명');
  I.see('조회수: 5593');

  I.dontSee('참가취소');
});

Scenario('등록된 게시글이 존재하는 경우 (미신청자 관점)', ({ I }) => {
  // Given
  I.setupPosts();
  I.setupMembersPosts();
  I.login({ userId: 2 });

  // When
  I.amOnPage('/');
  I.click('운동 찾기');

  // Then
  I.see('신청');
});

Scenario('등록된 게시글이 존재하는 경우 (신청자 관점)', ({ I }) => {
  // Given
  I.setupPosts();
  I.setupMembersPosts();
  I.login({ userId: 4 });

  // When
  I.amOnPage('/');
  I.click('운동 찾기');

  // Then
  I.see('신청취소');
});

Scenario('등록된 게시글이 존재하는 경우 (참가자 관점)', ({ I }) => {
  // Given
  I.setupPosts();
  I.setupMembersPosts();
  I.login({ userId: 3 });

  // When
  I.amOnPage('/');
  I.click('운동 찾기');

  // Then
  I.see('참가취소');
});
