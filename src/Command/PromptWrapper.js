import prompt from "prompt-async";

export class Prompt {
    #_schema

    get schema() {
        return this.#_schema;
    }

    constructor(schema) {
        this.#_schema = {properties: schema}
    }

    async call() {
        prompt.start()
        let result = await prompt.get(this.#_schema)
        prompt.stop()
        return result
    }
}
