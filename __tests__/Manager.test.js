const Manager = require("../lib/Manager");

describe("Initialization", () => {
  
  describe("getOfficeNumber()", () => {
    it("Can set office number via constructor argument", () => {
      const testValue = 100;
      const e = new Manager("isaham", 1, "unit@test.com", testValue);
      expect(e.officeNumber).toBe(testValue);
    });
  });

  describe("getRole()", () => {
    it('getRole() should return "Manager"', () => {
      const testValue = "Manager";
      const e = new Manager("isaham", 1, "unit@test.com", 100);
      expect(e.getRole()).toBe(testValue);
    });
  });

  describe("getOfficeNumber()", () => {
    it("Can get office number via getOffice()", () => {
      const testValue = 100;
      const e = new Manager("isaham", 1, "unit@test.com", testValue);
      expect(e.getOfficeNumber()).toBe(testValue);
    });
  });
});