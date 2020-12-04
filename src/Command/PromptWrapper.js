import prompt from "prompt-async";
import "core-js/stable"
import "regenerator-runtime/runtime"

export class Prompt {

    stop() {
        prompt.stop()
    }

    async call(properties) {
        prompt.start()
        prompt.resume()
        let result = await prompt.get({properties})
        prompt.pause()
        return result
    }
}

export {prompt as PromptAsync}