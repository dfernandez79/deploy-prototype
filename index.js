const shell = require('shelljs');
const ghpages = require('gh-pages');

function getDestinationFromGit() {
  const result = shell.exec('git symbolic-ref --short HEAD', {
    silent: true,
  });
  if (result.code !== 0) {
    throw new Error(
      `Failed to get the current branch or tag name using git.
Make sure that git is installed and available in your PATH.
Git stderr: ${result.stderr}`
    );
  } else {
    return result.stdout.trim();
  }
}

function deployPrototype(src, dest, { branch }) {
  const destination = dest === undefined ? getDestinationFromGit() : dest;
  ghpages.publish(src, {
    branch,
    dest: destination,
    add: true,
  });
}

module.exports = deployPrototype;
