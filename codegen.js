const { Command } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const packageJson = require('./package.json');

async function checkDirectoryIsAvailable(dir) {
  const files = await fs.readdir(dir);
  if (files.length > 0) {
    throw new Error('Directory must be empty!');
  }
}

async function copyTemplate(srcDir, destDir) {
  await fs.copy(srcDir, destDir);
}

async function makeDirectory(dir) {
  await fs.ensureDir(dir);
}

function printSuccessMessage() {
  console.log();
  console.log(`${chalk.cyan('Complete')}`);
  console.log();
}

function printErrorMessage(err) {
  console.log();
  console.error(`${chalk.redBright('<Installation failed>')}`);
  console.log(` ${chalk.bold(err.message)}`);
  console.log();
}

async function run() {
  let projectName;

  const program = new Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')}`)
    .action((name) => {
      projectName = name;
    })
    .on('--help', () => {
      console.log(
        `    Only ${chalk.green('<project-directory>')} is required.`,
      );
    })
    .parse(process.argv);

  if (typeof projectName === 'undefined') {
    console.error('Please specify the project directory:');
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`,
    );
    console.log();
    console.log('For example:');
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green('my-react-app')}`,
    );
    console.log();
    process.exit(1);
  }

  const srcDir = path.resolve(__dirname, './template');
  const destDir = path.resolve(process.cwd(), projectName);

  const isExist = await fs.pathExists(destDir);

  if (isExist) {
    try {
      await checkDirectoryIsAvailable(destDir);
      await copyTemplate(srcDir, destDir);
      printSuccessMessage();
    } catch (err) {
      printErrorMessage(err);
    }
    return;
  }
  await makeDirectory(destDir);
  await copyTemplate(srcDir, destDir);
  printSuccessMessage();
}

module.exports = { run };
