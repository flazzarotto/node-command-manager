"use strict";

var _ = require(".");

var initOptions = [{
  name: 'force',
  "short": 'f',
  type: 'boolean',
  description: 'Force file override (if project not empty)',
  example: "'script init --force' or 'script -f'"
}];
var initMod = {
  mod: 'init',
  description: 'Initialize project',
  options: initOptions,
  exec: function exec() {
    console.log(arguments);
  }
};
var mods = [initMod];
var npmSimplePublisherCommand = new _.CommandManager((0, _.getVersion)('./'));
var cmd = npmSimplePublisherCommand.newCommand({
  mods: mods
});
cmd.call(__dirname + '/', './');