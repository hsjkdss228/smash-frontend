Feature('운동 참가 신청 수락');

Before(({ I }) => {
  I.clearPosts();
});

Scenario('참가 신청을 수락할 수 있는 경우', async ({ I }) => {
  // Given
  I.setupPosts();
  I.setupMembersPosts();
  I.login({ userId: 1 });

  // When
  I.click('운동 찾기');
  I.click('축구');
  I.see('사용자 4');
  I.click('수락');

  // Then
  I.see('3/4명');
  I.logout();
  I.login({ userId: 4 });
  I.click('운동 찾기');
  I.click('참가취소');
});

Scenario('참가 신청을 수락할 수 없는 경우', async ({ I }) => {
  // Given
  I.setupPosts();
  I.setupMembersFinished();
  I.login({ userId: 1 });

  // When
  I.click('운동 찾기');
  I.click('배드민턴');

  // Then
  I.seeElement('button[disabled]');
});
