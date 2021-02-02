const Employee = require("../lib/Employee");

describe("Initialization", () => {

  describe('Employee', () => {
    it("Can instantiate Employee instance", () => {
      const e = new Employee();
      expect(typeof (e)).toBe("object");
    });
  });

  // Get name
  describe('getName()', () => {
    it("Can set name via constructor arguments", () => {
      const name = "Alice";
      const e = new Employee(name);
      expect(e.name).toBe(name);
    });
  });

  // Get Id
  describe('getId()', () => {
    it("Can set id via constructor argument", () => {
      const testValue = 100;
      const e = new Employee("Foo", testValue);
      expect(e.id).toBe(testValue);
    });
  });

  // Get email
  describe('getEmail()', () => {
    it("Can set email via constructor argument", () => {
      const testValue = "test@test.com";
      const e = new Employee("Foo", 1, testValue);
      expect(e.email).toBe(testValue);
    });
  });

  describe('getEmail()', () => {
    it("Can get name via getName()", () => {
      const testValue = "Alice";
      const e = new Employee(testValue);
      expect(e.getName()).toBe(testValue);
    });
  });

  describe('getId()', () => {
    it("Can get id via getId()", () => {
      const testValue = 100;
      const e = new Employee("Foo", testValue);
      expect(e.getId()).toBe(testValue);
    });
  });

  describe('getEmail()', () => {
    it("Can get email via getEmail()", () => {
      const testValue = "test@test.com";
      const e = new Employee("Foo", 1, testValue);
      expect(e.getEmail()).toBe(testValue);
    });
  });

  describe('getRole()', () => {
    it("getRole() should return \"Employee\"", () => {
      const testValue = "Employee";
      const e = new Employee("Alice", 1, "test@test.com");
      expect(e.getRole()).toBe(testValue);
      
    });
  });
  
});