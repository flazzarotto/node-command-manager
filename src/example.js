import {CommandManager, version} from "."

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
        console.log(arguments)
    }
}

const mods = [initMod]

const npmSimplePublisherCommand = new CommandManager(version)

const cmd = npmSimplePublisherCommand.newCommand({mods})

cmd.call(__dirname+'/','./')