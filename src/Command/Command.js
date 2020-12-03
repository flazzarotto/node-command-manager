import {modValidator, optionValidator} from "./Validator";
import {isCallable} from "./isCallable";
import argv from "argv";

export class Command {
    #_mods
    #_options
    #_callStack
    #_current = 0
    #_version

    get mods() {
        return [...this.#_mods]
    }

    get options() {
        return [...this.#_options]
    }

    get callStack() {
        return [...this.#_callStack]
    }

    constructor(mods = null, options = null, callStack = null, version = '1.0.0') {

        mods = mods ?? []
        options = options ?? []
        callStack = callStack ?? []

        if (!Array.isArray(callStack)) {
            callStack = [callStack]
        }

        for (let mod of mods) {
            modValidator(mod, version)
        }

        for (let option of options) {
            optionValidator(option)
        }

        for (let callable of callStack) {
            if (!isCallable(callable)) {
                throw new Error('callstack items must be callables (' + callable.toLocaleString() + ')')
            }
        }

        this.#_mods = mods
        this.#_options = options
        this.#_options.push({name: 'help', short: 'h', type: 'boolean', description: 'Display this help'})
        this.#_callStack = callStack
        this.#_version = version
    }

    async call(fileDirectory, contextDirectory,
               {mod = null, options = null, targets = null} = {}, previousResult) {
        let args = {mod, options, targets}
        if (!options) {
            // should be only for first-level command
            argv.version(this.#_version)
            argv.info(
                `\tCommand modules: \n\t- `
                + this.#_mods.map(mod => mod.mod).join(`\n\t- `)
                + `\n\n\tUse kc-nps [module] --help for more information about each module.`
            )
            for (let mod of this.#_mods) {
                argv.mod(mod)
            }
            argv.option(this.#_options)
            try {
                args = argv.run()
            } catch (e) {
                argv.help()
            }
        }

        if (args.options.help) {
            argv.help(args.mod)
            return
        }

        let index = this.#_mods.map(mod => mod.mod).indexOf(args.mod)
        if (index > -1) {
            this.#_mods[index].exec.call(fileDirectory, contextDirectory, args, previousResult)
            return
        } else if (this.#_callStack.length) {
            for (let call of this.#_callStack) {
                previousResult = await call(fileDirectory, contextDirectory, args, previousResult)
            }
            return
        }
        console.error('No command available, module probably missing')
        argv.help()
    }
}
