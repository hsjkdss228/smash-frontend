const backdoorBaseUrl = 'http://localhost:8000/backdoor';

module.exports = function () {
  return actor({
    // Setup Databases
    clearPosts() {
      this.amOnPage(`${backdoorBaseUrl}/empty-posts`);
    },
    setupPosts() {
      this.amOnPage(`${backdoorBaseUrl}/setup-posts`);
    },
    emptyMembers() {
      this.amOnPage(`${backdoorBaseUrl}/empty-members`);
    },

    // Operations

    // Seeing UI Components
    seeHeader() {
      this.see('SMASH');
      this.see('운동 선택하기');
      this.see('사이드바 메뉴');
    },
  });
};
