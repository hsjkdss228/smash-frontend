Feature('운동 참가 신청');

Scenario('사용자가 참가를 신청하는 경우', async ({ I }) => {
  // Given
  I.setupPosts();
  I.clearMembers();
  I.login({ userId: 1 });

  // When
  I.amOnPage('/posts/list');
  I.see('0/24명');
  I.click('신청', { css: 'section button:first-child' });

  // Then
  I.see('1/24명');
  I.see('신청취소');
});
