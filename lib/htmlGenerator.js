// import npm packages
const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const display = (employees) => {
  const html = [];

  html.push(
    employees
      .filter((employee) => employee.getRole() === "Manager")
      .map((manager) => displayManager(manager))
  );

  html.push(
    employees
      .filter((employee) => employee.getRole() === "Engineer")
      .map((engineer) => displayEngineer(engineer))
  );
  html.push(
    employees
      .filter((employee) => employee.getRole() === "Intern")
      .map((intern) => displayIntern(intern))
  );
  return displayMain(html.join(""));
};

const displayManager = (manager) => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replace(template, "name", manager.getName());
  template = replace(template, "role", manager.getRole());
  template = replace(template, "email", manager.getEmail());
  template = replace(template, "id", manager.getId());
  template = replace(template, "officeNumber", manager.getOfficeNumber());
  return template;
};

const displayEngineer = (engineer) => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replace(template, "name", engineer.getName());
  template = replace(template, "role", engineer.getRole());
  template = replace(template, "email", engineer.getEmail());
  template = replace(template, "id", engineer.getId());
  template = replace(template, "github", engineer.getGithub());
  return template;
};

const displayIntern = (intern) => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replace(template, "name", intern.getName());
  template = replace(template, "role", intern.getRole());
  template = replace(template, "email", intern.getEmail());
  template = replace(template, "id", intern.getId());
  template = replace(template, "school", intern.getSchool());
  return template;
};

const displayMain = (html) => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return replace(template, "team", html);
};

const replace = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = display;
