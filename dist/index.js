#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const log = console.log;
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 3000);
    });
};
async function welcome() {
    await sleep();
    rainbowTitle.stop();
}
let rainbowTitle = chalkAnimation.rainbow(`
\t---------------------------------\n\t   Welcome to Simple Calcualtor   \n\t---------------------------------`); // Animation starts
await welcome();
let playAgain;
do {
    const answer = await inquirer.prompt([
        {
            message: chalk.black.bold("Enter Your First Number:"),
            type: "input",
            name: "firsnum",
            validate: (value) => !isNaN(Number(value)) ? true : "Please enter a valid number",
        },
        {
            message: chalk.bgRed.white.bold.italic("Select one of the operator to perform action"),
            type: "list",
            name: "operator",
            choices: [
                chalk.green("+ Addition"),
                chalk.yellow("- Subtraction"),
                chalk.gray("* Multiplication"),
                chalk.red("/ Division"),
                chalk.blue("^ Power"),
            ],
        },
        {
            message: chalk.black.bold("Enter Your Second Number:"),
            type: "input",
            name: "secondnum",
            validate: (value) => !isNaN(Number(value)) ? true : "Please enter a valid number",
        },
    ]);
    //Condtional Statement
    if (answer.operator === chalk.green("+ Addition")) {
        log(`${chalk.green(`Addition:`)} ${chalk.blue(`${answer.firsnum + answer.secondnum}`)}`);
    }
    else if (answer.operator === chalk.yellow("- Subtraction")) {
        log(`${chalk.yellow(`Substraction:`)} ${chalk.blue(`${answer.firsnum - answer.secondnum}`)}`);
    }
    else if (answer.operator === chalk.gray("* Multiplication")) {
        log(`${chalk.blueBright(`Multiplication:`)} ${chalk.blue(`${answer.firsnum * answer.secondnum}`)}`);
    }
    else if (answer.operator === chalk.red("/ Division")) {
        if (answer.secondnum === 0) {
            throw new Error("Division by zero is not allowed.");
        }
        log(`${chalk.red(`Division:`)} ${chalk.blue(`${(answer.firsnum / answer.secondnum).toFixed(4)}`)}`);
    }
    else if (answer.operator === chalk.blue("^ Power")) {
        log(`${chalk.red(`Power:`)} ${chalk.blue(`${Math.pow(answer.firsnum, answer.secondnum)}`)}`);
    }
    else {
        log(`${chalk.red(`Please Select Invalid Operator`)}`);
    }
    const responses = await inquirer.prompt([
        {
            message: "Do you want to continue (Y/N)?",
            type: "input",
            name: "continue",
        },
    ]);
    playAgain = responses.continue.toUpperCase();
} while (playAgain === "Y");
log(`${chalk.yellow("Exiting calculator. Goodbye!😄")}`);
