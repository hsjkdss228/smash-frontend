Feature('운동 참가 신청 취소');

Before(({ I }) => {
  I.clearPosts();
});

Scenario('게시글 목록 조회 페이지에서 참가 신청 취소', async ({ I }) => {
  // Given
  I.setupPosts();
  I.setupMembersPosts();
  I.login({ userId: 1 });
  I.click('운동 찾기');
  I.click('축구');
  I.see('사용자 4');
  I.logout();

  // When
  I.login({ userId: 4 });
  I.click('운동 찾기');
  I.click('#posts-register-button-1');

  // Then
  I.see('2/4명');
  I.see('신청');
  I.logout();
  I.login({ userId: 1 });
  I.click('운동 찾기');
  I.click('축구');
  I.dontSee('사용자 4');
});

Scenario('게시글 상세 내용 페이지에서 참가 신청 취소', async ({ I }) => {
  // Given
  I.setupPosts();
  I.setupMembersPosts();
  I.login({ userId: 1 });
  I.click('운동 찾기');
  I.click('축구');
  I.see('사용자 4');
  I.logout();

  // When
  I.login({ userId: 4 });
  I.click('운동 찾기');
  I.click('축구');
  I.click('신청취소');

  // Then
  I.see('2/4명');
  I.see('신청');
  I.logout();
  I.login({ userId: 1 });
  I.click('운동 찾기');
  I.click('축구');
  I.dontSee('사용자 4');
});
