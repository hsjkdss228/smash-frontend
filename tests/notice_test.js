Feature('8. 알림: '
  + '운동 팀원을 모집하거나 운동 팀을 찾는 사람이 '
  + '참가 신청 수락과 같은 이벤트 발생 시 바로 확인하기 위해 '
  + '자신에게 전달된 알림을 확인할 수 있다.');

Before(({ I }) => {
  I.clearDatabases();
});

Scenario('알림 목록 확인', ({ I }) => {
  // Given
  I.setupNotices();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/notices');

  // Then
  I.see('06:00');
  I.see('05:00');
  I.see('04:00');
  I.see('03:00');
  I.see('02:00');
  I.see('01:00');
  I.seeNumberOfElements('.notice-status-unread', 3);
  I.seeNumberOfElements('.notice-status-read', 3);
  I.see('알림 제목 6');
  I.see('알림 제목 5');
  I.see('알림 제목 4');
  I.see('알림 제목 3');
  I.see('알림 제목 2');
  I.see('알림 제목 1');
});

Scenario('읽지 않은 알림 개수 확인', ({ I }) => {
  // Given
  I.setupNotices();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/notices');

  // Then
  I.see('알림(3)');
});

Scenario('알림 상세 내용 확인 확인 (읽지 않은 알림을 확인할 경우)', ({ I }) => {
  // Given
  I.setupNotices();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/notices');
  I.see('알림(3)');
  I.click('알림 제목 4');

  // Then
  I.see('알림 내용 4');
  I.see('알림(2)');
  I.seeNumberOfElements('.notice-status-unread', 2);
  I.seeNumberOfElements('.notice-status-read', 4);
});

Scenario('알림 상세 내용 확인 확인 (읽은 알림을 확인할 경우)', ({ I }) => {
  // Given
  I.setupNotices();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/notices');
  I.see('알림(3)');
  I.click('알림 제목 2');

  // Then
  I.see('알림 내용 2');
  I.see('알림(3)');
  I.seeNumberOfElements('.notice-status-unread', 3);
  I.seeNumberOfElements('.notice-status-read', 3);
});

Scenario('목록에서 모든 알림 확인', ({ I }) => {
  // Given
  I.setupNotices();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/notices');
  I.see('모든 알림 확인');
  I.click('모든 알림 확인');

  // Then
  I.seeNumberOfElements('.notice-status-unread', 3);
  I.seeNumberOfElements('.notice-status-read', 3);
});

Scenario('목록에서 읽지 않은 알림만 확인', ({ I }) => {
  // Given
  I.setupNotices();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/notices');
  I.see('읽지 않은 알림만 확인');
  I.click('읽지 않은 알림만 확인');

  // Then
  I.seeNumberOfElements('.notice-status-unread', 3);
  I.seeNumberOfElements('.notice-status-read', 0);
});

Scenario('알림 선택', ({ I }) => {
  // Given
  I.setupNotices();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When 1
  I.amOnPage('/notices');
  I.see('알림 선택');
  I.click('알림 선택');

  // Then 1
  I.see('전체선택');
  I.see('초기화');
  I.see('읽은 알림으로 처리');
  I.see('삭제');
  I.seeNumberOfElements('[type="checkbox"]', 6);
  I.checkOption('[id="5"]');
  I.seeCheckboxIsChecked('[id="5"]');
  I.click('전체선택');
  I.seeAllOfCheckboxIsChecked({ checkboxesCount: 6 });
  I.click('초기화');
  I.seeAllOfCheckboxIsUnchecked({ checkboxesCount: 6 });

  // When 2
  I.click('전체선택');
  I.click('알림 선택');

  // Then 2
  I.dontSee('전체선택');
  I.dontSee('초기화');
  I.dontSee('읽은 알림으로 처리');
  I.dontSee('삭제');
  I.seeNumberOfElements('[type="checkbox"]', 0);
  I.click('알림 선택');
  I.seeAllOfCheckboxIsUnchecked({ checkboxesCount: 6 });
});

Scenario('읽은 알림으로 표시', ({ I }) => {
  // Given
  I.setupNotices();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/notices');
  I.seeNumberOfElements('.notice-status-unread', 3);
  I.seeNumberOfElements('.notice-status-read', 3);
  I.click('알림 선택');
  I.checkOption('[id="4"]');
  I.checkOption('[id="5"]');
  I.click('읽은 알림으로 처리');

  // Then
  I.seeNumberOfElements('.notice-status-unread', 1);
  I.seeNumberOfElements('.notice-status-read', 5);
});

Scenario('알림 삭제', ({ I }) => {
  // Given
  I.setupNotices();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/notices');
  I.seeNumberOfElements('.notice-status-unread', 3);
  I.seeNumberOfElements('.notice-status-read', 3);
  I.click('알림 선택');
  I.click('전체선택');
  I.click('삭제');

  // Then
  I.see('조회 가능한 알림이 없습니다.');
});
