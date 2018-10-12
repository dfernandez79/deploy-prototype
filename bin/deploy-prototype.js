#!/usr/bin/env node

const mri = require('mri');
const chalk = require('chalk');
const args = process.argv.slice(2);
const deployPrototype = require('../index');

const parsedArgs = mri(args, {
  alias: {
    name: 'n',
    branch: 'b',
  },
  default: {
    branch: 'gh-pages',
    tag: '',
    remote: 'origin',
    add: false,
  },
  string: ['name', 'branch', 'tag', 'remote'],
  boolean: ['add'],
});

if (parsedArgs.help) {
  console.log(chalk`
{bold deploy-prototype} {yellow [source directory]} {yellow [options]}

It publishes the source directory as a subdirectory to the GH Pages branch,
using the current git branch or tag name as the destination directory name.

Source Directory:

  Optional, {bold dist} by default.

Options:

  --name={cyan name}     Use {cyan name} as the destination name.
  -n {cyan name}         When this option is on, Git will not be used to get the
                  current branch or tag.
  
  --branch={cyan name}   Name of the branch you'll be pushing to.
  -b {cyan name}         The default uses GitHub's {bold gh-pages}.

  --tag={cyan name}      Create a tag after committing changes on the target branch.
                  By default, no tag is created. To create a tag, provide the 
                  tag name as the option value.

  --remote={cyan name}   The name of the remote you'll be pushing to.
                  The default is {bold origin}.
  
  --add           Keep destination files.
                  Note: adding or removing files only affects the 
                  branch directory.
`);
} else {
  try {
    deployPrototype(
      parsedArgs._.length === 0 ? 'dist' : parsedArgs._[0],
      parsedArgs.name,
      { branch: parsedArgs.branch, tag: parsedArgs.tag, add: parsedArgs.add }
    );
  } catch (e) {
    console.log(chalk`{red Error:}
{red ${e.message}}`);
  }
}
