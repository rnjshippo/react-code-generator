import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';

const program = new Command();
const version = '0.0.1';

program
  .name('codegen')
  .version(version, '-v, --version')
  .option('-p, --path <path>', 'copy path', '.')
  .parse();

async function checkDirectoryIsAvailable(dir: string) {
  const files = await fs.readdir(dir);
  if (files.length > 0) {
    throw new Error('Directory must be empty!');
  }
}

async function copyTemplate(srcDir: string, destDir: string) {
  await fs.copy(srcDir, destDir);
}

async function makeDirectory(dir: string) {
  await fs.ensureDir(dir);
}

function printSuccessMessage() {
  console.log();
  console.log('Success');
}

function printErrorMessage(err: Error) {
  console.log();
  console.error('Installation failed:', err.message);
  console.log();
}

async function run(): Promise<void> {
  const options = program.opts();

  const srcDir = path.resolve(__dirname, '../template');
  const destDir = path.resolve(process.cwd(), options.path);

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
}

export { run };
