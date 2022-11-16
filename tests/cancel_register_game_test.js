Feature('운동 참가 취소');

Scenario('사용자가 참가를 취소하는 경우', async ({ I }) => {
  // Given
  I.setupPosts();
  I.clearMembers();
  I.setupMembers();
  I.login({ userId: 1 });

  // When
  I.amOnPage('/posts/list');
  I.see('1/24명');
  I.click('신청취소', { css: 'section button:first-child' });

  // Then
  I.see('0/24명');
  I.see('신청');
});
