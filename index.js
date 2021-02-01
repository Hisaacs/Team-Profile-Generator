// importing npm packages
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

// propmting user with questions
const questions = [
  {
    name: "name",
    message: "What's the employee's name?",
    validate: function (name) {
      if (name) {
        return true;
      } else {
        return "Please enter employee's name.";
      }
    },
  },
  {
    name: "id",
    message: "What's the employee's id?",
    validate: function (Id) {
      if (Id) {
        return true;
      } else {
        return "Please enter employee's Id.";
      }
    },
  },
  {
    name: "email",
    message: "What's the employee's email?",
    validate: function (email) {
      if (email) {
        return true;
      } else {
        return "Please enter employee's email.";
      }
    },
  },
  {
    type: "list",
    name: "role",
    message: "What's the employee's role?",
    choices: ["Manager", "Engineer", "Intern"],
  },
];

const questionForManager = [
  {
    name: "officeNumber",
    message: "What's the manager's office number?",
    validate: function (officeNumber) {
      if (officeNumber) {
        return true;
      } else {
        return "Please enter manager's office No.";
      }
    },
  },
];

const questionForEngineer = [
  {
    name: "github",
    message: "What's the Engineer's github?",
    validate: function (github) {
      if (github) {
        return true;
      } else {
        return "Please enter engineer's GitHub name.";
      }
    },
  },
];

const questionForIntern = [
  {
    name: "school",
    message: "What's the Intern's school?",
    validate: function (school) {
      if (school) {
        return true;
      } else {
        return "Please enter intern's school name.";
      }
    },
  },
];

const confirm = [
  {
    type: "confirm",
    name: "adding",
    message: "Do you want to input more employee information",
  },
];

const employeeTeam = async () => {
  const employees = [];
  let addEmployees = true;

  while (addEmployees) {
    //destructuring name, id , email, role from answer object
    const { name, id, email, role } = await inquirer.prompt(questions);

    if (role === "Manager") {
      const { officeNumber } = await inquirer.prompt(questionForManager);

      // creating a new Manager object and pushing this to the employees array
      employees.push(new Manager(name, id, email, officeNumber));
    } else if (role === "Engineer") {
      const { github } = await inquirer.prompt(questionForEngineer);

      // creating a new Engineer object and pushing to employees array
      employees.push(new Engineer(name, id, email, github));
    } else {
      const { school } = await inquirer.prompt(questionForIntern);

      // creating a new Engineer object and pushing to employees array
      employees.push(new Intern(name, id, email, school));
    }

    // checking to see whether user would like to add more employee data
    const { adding } = await inquirer.prompt(confirm);

    addEmployees = adding;

    if (adding === false) {
      console.log("Successfully created an index.html page!");
    }
  }

  const html = display(employees);

  if (!fs.existsSync(PATH_DIR)) {
    fs.mkdirSync(PATH_DIR);
  }
  fs.writeFileSync(outputPath, html, "utf-8");
};

employeeTeam();
