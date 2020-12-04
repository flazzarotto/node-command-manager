@kebab-case/node-command-manager
================================

Easily create nodejs command-line tools. This tool is build on `argv` and provides :
- easy to use command modules and options
- interactive shell
- function stacking with access to previous result
- sync prompt

## INSTALL

```shell script
yarn add @kebab-case/node-command-manager
# or
npm i @kebab-case/node-command-manager
```

## DEPENDENCIES

- argv
- prompt-sync

## HOW TO

Here is an example:

```javascript
import {CommandManager, version} from "@kebab-case/node-command-manager"

const initOptions = [{
    name: 'force',
    short: 'f',
    type: 'boolean',
    description: 'Force file override (if project not empty)',
    example: "'script init --force' or 'script -f'"
}]

const initMod = {
    mod: 'init',
    description: 'Initialize project',
    options: initOptions,
    exec: function() {

    }
}

const mods = [initMod]

const npmSimplePublisherCommand = new CommandManager(version)

const cmd = npmSimplePublisherCommand.newCommand({mods})

cmd.call(__dirname+'/','./')
```

As you can see, the tool uses same modules / options objects as argv, but you can set mods as array.
Also, you must set up the `exec` property to set up which callable(s) to call for the module. 

`exec` property can be either a @kebab-case/node-command-manager/Command, a function or an array of 
commands and functions.

If you use functions as `exec`, they should have the following signature:
```javascript
/**
 * @param fileDirectory base command __dirname
 * @param contextDirectory directory where command is run
 * @param mod current mod
 * @param options passed to command
 * @param targets other arguments
 * @param previousResult result returned by previous element in the callstack, if any
 */
function yourFunction (fileDirectory, contextDirectory,{mod, options, targets}, previousResult) {
    // ... 
    // your own process
    // ..
    
    // optional - will be passed to next function / command in stack
    return result
}
```

## Interactive shell

You can use the interactive shell to exec interactive commands. Usage example:
```javascript
import {interactiveShell} from "@kebab-case/node-command-manager"

interactiveShell('npm', ['login'], {
    username: myUsername,
    password: myPassword,
    emailthisispublic: myEmail
}, callbackFunction)
```
where `username`, `password` and `emailthisispublic` are prompt labels, and their values answers to
prompt. By default, prompt labels are case-insensitive and ignore all non alphabetical characters,
but you can use your own normalize function. You can use regex syntax, such as `'username.*'` since
matching method is `string.match`.
A prompt will appear when a same property is asked twice in a row so you can enter answer manually.
This function can be used with `interactive = false` to run non-interactive scripts to display
original output.

## Console
You can output to the shell using the `ConsoleColor` component. Just define your own colors,
using console._setCustomColors:
```javascript
import console, {colorCodes} from '@kebab-case/node-command-manager/ConsoleColor'

console._setCustomColors({
    log: null,
    error: colorCodes.bgRed + colorCodes.fgWhite,
    info: colorCodes.bgCyan + colorCodes.fgWhite,
    warn: colorCodes.fgYellow
})
```
or you can keep default colors, and start using `console` as usual!
Note that only log method can have "null" colors.

## Sync Prompt

Just a small wrap of `prompt-async` with sync behaviour. You can also use `PromptAsync` (which is
basically an alias of `prompt-async`) if you prefer asynchronous. Please consult the doc of
`prompt-async` for more information about `Prompt.call()` and `PromptAsync`.