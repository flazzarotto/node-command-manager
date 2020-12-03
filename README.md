@kebab-case/node-command-manager
================================

Easily create nodejs command-line tools. This tool is build on `argv` and provides :
- easy to use command modules and options
- interactive shell
- function stacking with access to previous result
- sync prompt

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

You can use the interactive shell to exec interactive commands. Usage:
```javascript
import {interactiveShell} from "@kebab-case/node-command-manager"

interactiveShell('npm', ['login'], {
    username: myUsername,
    password: myPassword,
    emailthisispublic: myEmail
}, callbackFunction)
```
where `username`, `password` and `emailthisispublic` are prompt labels, and their values answers to
prompt. Prompt labels are case-insensitive and ignore all non alphabetical characters.

## Sync Prompt

This component is in development stage. You can use `prompt-async` along with `await` to achieve same
result without surprises ;-)