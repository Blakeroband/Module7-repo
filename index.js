import inquirer from "inquirer";
import fs from "fs";
import { resourceLimits } from "worker_threads";

// // prompt for information about application
inquirer
  .prompt([
    {
      type: `input`,
      name: `title`,
      message: `what is your project title?`,
    },
    {
      type: `input`,
      name: `description`,
      message: `Please describe your project:`,
    },
    {
      type: `input`,
      name: `installation`,
      message: `describe how to install your project:`,
    },
    {
      type: `input`,
      name: `contributions`,
      message: `who has contributed to the creation of your project?:`,
    },
    {
      type: `input`,
      name: `usage`,
      message: `how do you use your application?:`,
    },
    {
      type: `input`,
      name: `test`,
      message: `how would a user test your application?:`,
    },
    {
      type: `list`,
      name: `license`,
      message: `pick your project license`,
      choices: [
        `None`, 
        `Apache License 2.0`,
        `GNU General Public License v3.0`, 
        `MIT license`, 
        `BSD 2-Clause "simplified`, 
        `BSD 3-Clause "new" or "revised" license`, 
        `Boost Software license 1.0`, 
        `Creative Commons Zero v1.0 Universal`,
      ]
    },
    {
      type: `input`,
      name: `Github`,
      message: `what is your Github username?:`,
    },
    {
      type: `input`,
      name: `email`,
      message: `What is your email address?:`,
    },
  ])
  .then((answers) => {
    const content = generateMarkdown(answers);
    fs.writeFile(`${answers.title}.md`, content, (err) => {
      if (err) {
        console.log(`an error has occured`)
      } else {
        console.log(`${answers.title}.md succesfully created!`);        
      }
    });
  });
function licenseBadge(license) {
  switch(license) {
    case `Apache License 2.0`:
      return `https://img.shields.io/badge/License-Apache_2.0-blue.svg`;
    case `GNU General Public License v3.0`:
      return `https://img.shields.io/badge/License-GPLv3-blue.svg`;
    case `MIT license`:
      return `https://img.shields.io/badge/License-MIT-yellow.svg`;
    case `BSD 2-Clause "simplified`:
      return `https://img.shields.io/badge/License-BSD_2--Clause-orange.svg`;
    case `BSD 3-Clause "new" or "revised" license`:
      return `https://img.shields.io/badge/License-BSD_3--Clause-blue.svg`;
    case `Boost Software license 1.0`:
      return `https://img.shields.io/badge/License-Boost_1.0-lightblue.svg`;
    case `Creative Commons Zero v1.0 Universal`:
      return `https://licensebuttons.net/l/zero/1.0/80x15.png`;
    default:
      return ``;
  }
}
function licenseText(license) {
  switch(license) {
    case `Apache License 2.0`:
      return `Apache License 2.0: 
https://www.apache.org/licenses/LICENSE-2.0.txt`;
    case `GNU General Public License v3.0`:
      return `GNU General Public License v3.0: 
https://www.gnu.org/licenses/gpl-3.0.txt`;
    case `MIT license`:
      return `MIT license: 
https://opensource.org/licenses/MIT`;
    case `BSD 2-Clause "simplified`:
      return `BSD 2-Clause 'Simplified' License: 
https://opensource.org/licenses/BSD-2-Clause`;
    case `BSD 3-Clause "new" or "revised" license`:
      return `BSD 3-Clause 'New' or 'Revised' License: 
https://opensource.org/licenses/BSD-3-Clause`;
    case `Boost Software license 1.0`:
      return `Boost Software License 1.0: 
https://www.boost.org/LICENSE_1_0.txt`;
    case `Creative Commons Zero v1.0 Universal`:
      return `Creative Commons Zero v1.0 Universal: 
https://creativecommons.org/publicdomain/zero/1.0/legalcode`;
    default:
      return ``;
  }
}



// one big string
function generateMarkdown(data) {
  const badge = licenseBadge(data.license)
  const text = licenseText(data.license)
  return `# ${data.title}

  ${badge}

  ## Description
  ${data.description}

  ## Table of Contents
  - [installation](#installation)
  - [contributions](#contributions)
  - [usage](#usage)
  - [test](#test)
  - [license](#license)

  ## installation
  ${data.installation}

  ## contributions
  ${data.contributions}

  ## usage
  ${data.usage}
  
  ## test
  ${data.test}

  ## license
  ${text}
  
  ## questions
  feel free to visit my github https://github.com/${data.Github}
  if you have questions, please contact me through my email: ${data.email}`
  }