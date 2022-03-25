import {CommandManager, getVersion, interactiveShell} from "."

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
  exec: async function () {
    await interactiveShell('dir', [], [], false, null, [], {cwd: '..'});
    throw new Error('t')
    // console.log(arguments)
  }
}

const mods = [initMod]

const npmSimplePublisherCommand = new CommandManager(getVersion('./'))

const cmd = npmSimplePublisherCommand.newCommand({mods})

;(async () => {
  try {
    await cmd.call(__dirname + '/', './')
  } catch (e) {
    console.error(e)
  }
})()
