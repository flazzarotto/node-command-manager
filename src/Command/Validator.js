import {isCallable} from "./isCallable"
import {Command} from "./Command";

export const modValidator = (mod, version) => {

    if (!mod.mod) {
        throw new Error('`mod` field is required for mods.')
    }
    if (!mod.options) {
        throw new Error('`options` field is required for mods, even if empty.')
    }

    if (!mod.exec) {
        throw new Error('callable `exec` field is required for mods.')
    }

    if (mod.exec instanceof Command) {
        return
    }

    if (!Array.isArray(mod.exec)) {
        mod.exec = [mod.exec]
    }

    for (let exec of mod.exec) {
        if (!(isCallable(exec))) {
            throw new Error('`exec` field is required to be a callable object or an array of callable objects')
        }
    }



    mod.exec = new Command(null, mod.options, mod.exec, version)
}


export const optionValidator = option => {
    if (!option.name) {
        throw new Error('`name` field is required for options.')
    }
    if (!option.type) {
        throw new Error('`type` field is required for options.')
    }
}
