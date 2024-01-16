# How to contribute

Thank you for wanting to contribute to the AnnotatedJS project!

## Testing

The full test suite can be ran via the `npm test` command. It also runs as part of the PR pipeline.

## Submitting changes

Please send a [GitHub Pull Request to AnnotatedJS](https://github.com/Fork-Git-It/AnnotatedJS/pull/new/master) with a clear list of what you've done (read more about [pull requests](http://help.github.com/pull-requests/)).

Always write a clear log message for your commits. One-line messages are fine for small changes, but bigger changes should look like this:

    $ git commit -m "A brief summary of the commit
    >
    > A paragraph describing what changed and its impact."

## Coding conventions

AnnotatedJS uses the default [prettier](https://prettier.io/) formatter. The command `npm run format` will automatically format the codebase.

Please bump the version number of the package based on the type of PR (Feature or Fix). Also be sure that the package-lock.json is updated as well!
