const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

// referencing file in directories file paths
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const display = require("./lib/htmlGenerator");

// adding an output path
const PATH_DIR = path.resolve(__dirname, "dist");
const outputPath = path.join(PATH_DIR, "index.html");

function validate(input) {
  if (!input == "") {
    return true;
  } else {
    return "Field cannot be blank";
  }
}

// propmting user with questions
const questions = {
  type: function () {
    return {
      message: "Please confirm team memeber you would like to add?",
      type: "list",
      name: "member",
      choices: ["Engineer", "Intern", "No more to add"],
    };
  },
  item: function (member, variable, item = variable, validate) {
    return {
      message: `What is your ${member.toLowerCase()}'s ${item}?`,
      type: "input",
      name: variable,
      validate: validate,
    };
  },
};
async function generateHTML() {
  const html = display(employees);

  if (!fs.existsSync(PATH_DIR)) {
    fs.mkdirSync(PATH_DIR);
  }
  fs.writeFileSync(outputPath, html, "utf-8");
  console.log("Successfully created an index.html page!");
}

let employees = [];

async function addEmployee(member) {
  
  let { name } = await inquirer.prompt(questions.item(member, "name", "name", validate));
  let { id } = await inquirer.prompt(questions.item(member, "id", "ID number", validate));
  let { email } = await inquirer.prompt(questions.item(member, "email", "email address", validate));
  
  switch (member) {
    case "Manager":
      let { officeNumber } = await inquirer.prompt(
        questions.item(member, "officeNumber", "office phone number", validate)
      );
      employees.push(new Manager(name, id, email, officeNumber));
      break;
    case "Engineer":
      let { github } = await inquirer.prompt(questions.item(member, "github", "GitHub username", validate));
      employees.push(new Engineer(name, id, email, github));
      break;
    case "Intern":
      let { school } = await inquirer.prompt(questions.item(member, "school", "school", validate));
      employees.push(new Intern(name, id, email, school));
      break;

      default:
        addManager();
  }
}

async function addManager() {
  console.log("Lets start building your team");
  await addEmployee("Manager");
  let member = "";
  let exit = "No more to add";
  while (member != exit) {
    let { member } = await inquirer.prompt(questions.type());
    if (member === exit) {
      return generateHTML();
    }
    await addEmployee(member);
  }
}

addManager();
