const Intern = require('../lib/intern');

describe("Initialization", () => {

  describe('getSchool()', () => {
    it("Can set school via constructor", () => {
      const testValue = "UWA";
      const e = new Intern("isaham", 1, "unit@test.com", testValue);
      expect(e.school).toBe(testValue);
    });
  });

  describe('getSchool()', () => {
    it("getRole() should return \"Intern\"", () => {
      const testValue = "Intern";
      const e = new Intern("isaham", 1, "unit@test.com", "UCLA");
      expect(e.getRole()).toBe(testValue);
    });
  });

  describe('getSchool()', () => {
    it("Can get school via getSchool()", () => {
      const testValue = "UWA";
      const e = new Intern("isaham", 1, "unit@test.com", testValue);
      expect(e.getSchool()).toBe(testValue);
    });
  });
  
});