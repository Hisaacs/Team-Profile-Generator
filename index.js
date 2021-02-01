// import npm packages
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// add output path
const PATH_DIR = path.resolve(__dirname, "dist");
const outputPath = path.join(PATH_DIR, "index.html");


const render = require("./lib/htmlGenerator");

const teamMembers = [];
const emptyId = [];

const employeeQuestions = [{
        type: "input",
        name: "nameManager",
        message: "What is the manager's name?",
        validate: (managerInput) => {
            if (managerInput) {
                return true;
            } else {
                console.log("Please enter managers name!");
                return false;
            }
        },
    },
    {
        type: "input",
        name: "managerId",
        message: "What is the manager's ID?",
        validate: (managerId) => {
            if (managerId) {
                return true;
            } else {
                console.log("Please enter valid Id!");
                return false;
            }
        },
    },
    {
        type: "input",
        name: "emailManager",
        message: "What is the manager's email?",
        validate: (managerEmail) => {
            if (managerEmail) {
                return true;
            } else {
                console.log("Please enter valid email address!");
                return false;
            }
        },
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?",
        validate: (managerOffNumber) => {
            if (managerOffNumber) {
                return true;
            } else {
                console.log("Please enter valid office contact number!");
                return false;
            }
        },
    },
];

function createManager() {
    console.log("Build your team");
    inquirer.prompt(employeeQuestions).then(function (data) {
        const manager = new Manager(
            data.nameManager,
            data.managerId,
            data.emailManager,
            data.officeNumber
        );
        teamMembers.push(manager);
        emptyId.push(data.managerId);
        createTeam();
    });
}

function engineer() {
    inquirer
        .prompt([{
                type: "input",
                name: "engineerName",
                message: "What is the engineer's name?",
                validate: (engineerName) => {
                    if (engineerName) {
                        return true;
                    } else {
                        console.log("Please enter valid name!");
                        return false;
                    }
                },
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is the engineer's ID?",
                validate: (engineerId) => {
                    if (engineerId) {
                        return true;
                    } else {
                        console.log("Please enter a valid Id!");
                        return false;
                    }
                },
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is the engineer's email?",
                validate: (engineerEmail) => {
                    if (engineerEmail) {
                        return true;
                    } else {
                        console.log("Please enter valid email address!");
                        return false;
                    }
                },
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is the engineer's GitHub username?",
                validate: (engineerGitHub) => {
                    if (engineerGitHub) {
                        return true;
                    } else {
                        console.log("Please enter valid GitHub name!");
                        return false;
                    }
                },
            },
        ])
        .then(function (data) {
            const engineer = new Engineer(
                data.engineerName,
                data.engineerId,
                data.engineerEmail,
                data.engineerGithub
            );
            teamMembers.push(engineer);
            emptyId.push(data.engineerId);
            createTeam();
        });
}

function intern() {
    inquirer
        .prompt([{
                type: "input",
                name: "internName",
                message: "What is the intern's name?",
                validate: (internName) => {
                    if (internName) {
                        return true;
                    } else {
                        console.log("Please enter valid name!");
                        return false;
                    }
                },
            },
            {
                type: "input",
                name: "internId",
                message: "What is the intern's ID?",
                validate: (internId) => {
                    if (internId) {
                        return true;
                    } else {
                        console.log("Please enter valid Id!");
                        return false;
                    }
                },
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is the intern's email?",
                validate: (internEmail) => {
                    if (internEmail) {
                        return true;
                    } else {
                        console.log("Please enter valid email address!");
                        return false;
                    }
                },
            },
            {
                type: "input",
                name: "internSchool",
                message: "What is the intern's school?",
                validate: (internSchool) => {
                    if (internSchool) {
                        return true;
                    } else {
                        console.log("Please enter valid school name!");
                        return false;
                    }
                },
            },
        ])
        .then(function (data) {
            const intern = new Intern(
                data.internName,
                data.internId,
                data.internEmail,
                data.internSchool
            );
            teamMembers.push(intern);
            emptyId.push(data.internId);
            createTeam();
        });
}

function addTeamMember() {
    inquirer
        .prompt([{
            type: "list",
            name: "memberChoice",
            message: "Which type of member would you like to add?",
            choices: ["Manager", "Engineer", "Intern"],
        }, ])
        .then(function (data) {

            if (data.memberChoice === "Manager") {
                createManager();
            } else if (data.memberChoice === "Engineer") {
                engineer();
            } else if (data.memberChoice === "Intern") {
                intern();
            } else outputTeam();
        });
}

function createTeam() {
    inquirer
        .prompt([{
            type: "confirm",
            name: "addNew",
            message: "Would you Like to add another team member?",
        }, ])
        .then((res) => {
            if (res.addNew === true) {
                addTeamMember(teamMembers);
            } else if (res.addNew === true) {
                intern(teamMembers);
            } else outputTeam()
            console.log('File saved');
        });
}

function outputTeam() {
    if (!fs.existsSync(PATH_DIR)) {
        fs.mkdirSync(PATH_DIR);
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
}

createManager();