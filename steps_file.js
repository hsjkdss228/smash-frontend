const backdoorBaseUrl = 'http://localhost:8000/backdoor';

module.exports = function () {
  return actor({
    // Setup Databases
    clearPosts() {
      this.amOnPage(`${backdoorBaseUrl}/clear-posts`);
    },
    setupPosts() {
      this.amOnPage(`${backdoorBaseUrl}/setup-posts`);
    },
    clearMembers() {
      this.amOnPage(`${backdoorBaseUrl}/clear-members`);
    },
    setupMembersPosts() {
      this.amOnPage(`${backdoorBaseUrl}/setup-members-posts`);
    },
    setupMembersNotFinished() {
      this.amOnPage(`${backdoorBaseUrl}/setup-members-not-finished`);
    },
    setupMembersFinished() {
      this.amOnPage(`${backdoorBaseUrl}/setup-members-finished`);
    },
    setupMembersWhenRegistered() {
      this.amOnPage(`${backdoorBaseUrl}/setup-members-registered`);
    },
    setupMembersWithApplicants() {
      this.amOnPage(`${backdoorBaseUrl}/setup-members-with-applicants`);
    },
    setupMembersWithoutApplicants() {
      this.amOnPage(`${backdoorBaseUrl}/setup-members-without-applicants`);
    },

    // Actions
    login({ userId }) {
      this.amOnPage('/');
      this.fillField('User Id:', userId);
      this.click('로그인');
    },
    logout() {
      this.amOnPage('/');
      this.click('로그아웃');
    },

    // Seeing UI Components
    seeHeader() {
      this.see('SMASH');
    },
  });
};
