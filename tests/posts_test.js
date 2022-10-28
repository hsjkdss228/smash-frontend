Feature('게시글 페이지');

Scenario('등록된 게시글이 없는 경우', ({ I }) => {
  // Given
  // 테스트를 위한 백도어 세팅 필요

  // When
  I.amOnPage('/posts/list');

  // Then
  I.see('모집 게시글이 없습니다.');
});

Scenario('동록된 게시글이 존재하는 경우', ({ I }) => {
  // Given
  // 테스트를 위한 백도어 세팅 필요

  // When
  I.amOnPage('/posts/list');

  // Then
  I.see('모집 게시글 1');
  I.see('현재 참가자 수: 3');
  I.see('모집 게시글 2');
  I.see('현재 참가자 수: 5');
});
