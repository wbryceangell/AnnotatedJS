# How to contribute

Thank you for wanting to contribute to the AnnotatedJS project!

## Testing

At the moment we only have functional testing for Node.js and Service Worker runtimes (see [README](https://github.com/Fork-Git-It/AnnotatedJS/blob/main/README.md)). Please try running these functional tests with the changeset in a well supported browser and the LTS version of Node.js.

## Submitting changes

Please send a [GitHub Pull Request to AnnotatedJS](https://github.com/Fork-Git-It/AnnotatedJS/pull/new/master) with a clear list of what you've done (read more about [pull requests](http://help.github.com/pull-requests/)).

Always write a clear log message for your commits. One-line messages are fine for small changes, but bigger changes should look like this:

    $ git commit -m "A brief summary of the commit
    > 
    > A paragraph describing what changed and its impact."

## Coding conventions

AnnotatedJS uses the default [prettier](https://prettier.io/) formatter. The command `npm run format` will automatically format the codebase.
