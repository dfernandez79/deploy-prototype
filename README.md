Deploy prototype it's a small CLI tool built on top of [gh-pages] with the
intention of deploying UI prototypes to GitHub Pages.

Instead of deploying a whole directory to the GH Pages branch, this tool creates
a new directory based on the current branch name.

The usage scenario is that you can create different prototype variations in
different branches, and publish them to GH Pages having a sub-directory for each
branch. So you can check and share your prototype variations.

[gh-pages] do all the work; this tool adds the additional functionality of getting
the current branch name.

[gh-pages]: https://github.com/tschaub/gh-pages
