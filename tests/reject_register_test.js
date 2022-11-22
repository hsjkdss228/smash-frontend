Feature('운동 참가 신청 거절');

Before(({ I }) => {
  I.clearPosts();
});

Scenario('운동 참가 신청을 거절하는 경우', async ({ I }) => {
  // Given
  I.setupPosts();
  I.setupMembersPosts();
  I.login({ userId: 1 });

  // When
  I.click('운동 찾기');
  I.click('축구');
  I.see('사용자 4');
  I.click('거절');

  // Then
  I.logout();
  I.login({ userId: 4 });
  I.click('운동 찾기');
  I.click('축구');
  I.dontSee('신청취소');
  I.see('신청');
});
