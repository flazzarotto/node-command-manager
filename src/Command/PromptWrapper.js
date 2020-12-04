import prompt from "prompt-async";
import "core-js/stable"
import "regenerator-runtime/runtime"

export class Prompt {
    #_schema

    get schema() {
        return this.#_schema;
    }

    constructor(schema) {
        this.#_schema = {properties: schema}
    }

    stop() {
        prompt.stop()
    }

    async call() {
        prompt.start()
        prompt.resume()
        let result = await prompt.get(this.#_schema)
        prompt.pause()
        return result
    }
}

export {prompt as PromptAsync}