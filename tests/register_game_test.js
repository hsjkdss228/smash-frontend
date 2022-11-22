Feature('운동 참가 신청');

Before(({ I }) => {
  I.clearPosts();
});

Scenario('게시글 목록 조회 페이지에서 참가 신청', async ({ I }) => {
  // Given
  I.setupPosts();
  I.setupMembersPosts();
  I.login({ userId: 2 });

  // When
  I.click('운동 찾기');
  I.click('#posts-register-button-2');

  // Then
  I.see('2/4명');
  I.see('신청취소');
  I.logout();
  I.login({ userId: 1 });
  I.click('운동 찾기');
  I.click('배구');
  I.see('사용자 2');
  I.see('수락');
});

Scenario('게시글 상세 내용 페이지에서 참가 신청', async ({ I }) => {
  // Given
  I.setupPosts();
  I.setupMembersPosts();
  I.login({ userId: 2 });

  // When
  I.click('운동 찾기');
  I.click('배구');
  I.click('신청');

  // Then
  I.see('2/4명');
  I.see('신청취소');
  I.logout();
  I.login({ userId: 1 });
  I.click('운동 찾기');
  I.click('배구');
  I.see('사용자 2');
  I.see('거절');
});
