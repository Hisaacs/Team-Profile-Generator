// import npm packages
const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const render = employees => {
  const html = [];

  html.push(employees
    .filter(employee => employee.getRole() === "Manager")
    .map(manager => renderManager(manager))
  );

  return renderMain(html.join(""));

};

const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replace(template, "name", manager.getName());
  template = replace(template, "role", manager.getRole());
  template = replace(template, "email", manager.getEmail());
  template = replace(template, "id", manager.getId());
  template = replace(template, "officeNumber", manager.getOfficeNumber());
  return template;
};




const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return replace(template, "team", html);
};

const replace = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;
