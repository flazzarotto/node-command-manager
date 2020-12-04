import cp from 'child_process'
import {Prompt} from './PromptWrapper'
import console from './ConsoleColor'

const prompt = new Prompt({
    continue: {
        description: 'Please enter another value'
    }
})

/**
 * Basic normalize function to match your labels and prompted labels
 * @param string
 * @returns {string}
 */
const normalize = string => string.replace(/[^\w\d]/ig, '').toLowerCase()

/**
 * Provides a simple interactive shell to answer prompts
 * @param cmd command name to execute
 * @param args command arguments
 * @param possibleAnswers {object} if interactive, the list of {promptA: valueA} to answer prompt - promptA can use regex syntax (ex. 't.*')
 * @param interactive
 * @param customNormalizeFunction {function} your own normalize function for prompted labels - default: strip all non alphanumerical characters
 */
export async function interactiveShell(cmd, args, possibleAnswers = {}, interactive = true,
                                       customNormalizeFunction = normalize) {

    let data_line = ''

    const childProcess = await cp.spawn(cmd, [...args],
        {
            stdio: interactive ? 'pipe' : ['pipe', 1, 2]
        });

    if (interactive) {
        childProcess.stdout.setEncoding('utf8')
        let lastDataLine = null
        childProcess.stdout.on("data", async function (data) {
            data_line += data
            let prop = customNormalizeFunction(data_line)
            let possibleAnswer = possibleAnswers[prop] ||
                possibleAnswers[Object.keys(possibleAnswers).filter(property => prop.match(property))[0]]
            if (possibleAnswer) {
                if (lastDataLine === data_line) {
                    console.warn('Same property (' + data_line + ') asked again ( value already provided: '
                        + possibleAnswer + ')')
                    possibleAnswer = (await prompt.call()).continue
                }
                console.log(data_line + (prop === 'password' ? '' : possibleAnswer))
                childProcess.stdin.write(possibleAnswer + '\n')
            } else {
                console.info(data_line)
            }
            lastDataLine = data_line
            data_line = ''
        })

        let stdOutErrLine = ''
        childProcess.stdout.on('error', function (data) {
            stdOutErrLine += data
            if (stdOutErrLine.indexOf("\n") > -1 && stdOutErrLine.replace(/\s/g,'').length) {
                console.error(data.toString())
                stdOutErrLine = ''
            }
        })

        let stdErrLine = ''
        childProcess.stderr.on("data", function (data) {
            stdErrLine += data
            if (stdErrLine.indexOf("\n") > -1 && stdErrLine.replace(/\s/g,'').length) {
                console.error(data + '')
                stdErrLine = ''
            }
        })
    }

    return new Promise((resolve) => {
        childProcess.on('exit', function () {
            childProcess.kill()
            resolve()
        })
    })
}
