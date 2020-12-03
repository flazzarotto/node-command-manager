import "core-js/stable"
import "regenerator-runtime/runtime"
import {Prompt} from "./PromptWrapper";
import {Command} from "./Command";

export default class {
    #_globalVersion

    get globalVersion() {
        return this.#_globalVersion
    }

    constructor(globalVersion = '1.0.0') {
        this.#_globalVersion = globalVersion
    }

    /**
     * @param mods {Array}
     * @param options {Array}
     * @param callStack {function|Prompt|Command|function[]|Prompt[]|Command[]}
     * @param version {string}
     */
    newCommand({
                   mods = null, options = null, callStack = null,
                   version = this.globalVersion
               }) {
        return new Command(mods, options, callStack, version)
    }

    /**
     * @param schema {Array|Object|String} properties to ask for
     * @param resolve {PromptCallback}
     * @return {Prompt}
     */
    newPrompt(schema, resolve) {
        return new Prompt(schema, resolve)
    }

    /**
     * @callback PromptCallback
     * @param {Error|null} error, if any
     * @param {Object|null} result
     */
}
