const Engineer = require("../lib/engineer");

describe("Initialization", () => {
  describe("getGithub()", () => {
    it("Can set GitHUb account via constructor", () => {
      const testValue = "GitHubUser";
      const e = new Engineer("isaham", 1, "unit@test.com", testValue);
      expect(e.github).toBe(testValue);
    });
  });

  describe("getRole()", () => {
    it('getRole() should return "Engineer"', () => {
      const testValue = "Engineer";
      const e = new Engineer("isaham", 1, "unit@test.com", "GitHubUser");
      expect(e.getRole()).toBe(testValue);
    });
  });

  describe("getGithub()", () => {
    it("Can get GitHub username via getGithub()", () => {
      const testValue = "GitHubUser";
      const e = new Engineer("isaham", 1, "unit@test.com", testValue);
      expect(e.getGithub()).toBe(testValue);
    });
  });
});
