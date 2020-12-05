import cp from 'child_process'
import {Prompt} from './PromptWrapper'
import console from './ConsoleColor'

const prompt = new Prompt()

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
 * @param hiddenProps {string[]}list of props you want to hide entered values, such as password - default: ['password']
 */
export async function interactiveShell(cmd, args, possibleAnswers = {}, interactive = true,
                                       customNormalizeFunction = null, hiddenProps = ['password']) {

    let data_line = ''

    customNormalizeFunction = customNormalizeFunction || normalize

    const childProcess = await cp.spawn(cmd, [...args],
        {
            stdio: interactive ? 'pipe' : ['pipe', 1, 2]
        });

    let timeout = null

    if (interactive) {
        childProcess.stdout.setEncoding('utf8')
        let lastDataLine = null
        childProcess.stdout.on("data", async function (data) {
            if (timeout) {
                clearTimeout(timeout)
            }
            data_line += data
            let prop = customNormalizeFunction(data_line)
            let matchingProperty = possibleAnswers[prop] ? prop :
                Object.keys(possibleAnswers).filter(property => prop.match(property))[0]
            let possibleAnswer = possibleAnswers[matchingProperty]
            if (possibleAnswer) {
                let hidden = (hiddenProps.indexOf(matchingProperty) > -1) || (hiddenProps.indexOf(prop) > -1)
                if (lastDataLine === data_line) {
                    console.warn('Same property (' + data_line + ') asked again ( value already provided: '
                        + possibleAnswer + ')')
                    possibleAnswer = (await prompt.call({
                        continue: {
                            description: 'Please enter another value',
                            hidden
                        }
                    })).continue
                }
                console.log(data_line + (hidden ? '******' : possibleAnswer))
                childProcess.stdin.write(possibleAnswer + '\n')
            } else {
                console.log(data_line)
                timeout = setTimeout(async () => {
                    let hidden = hiddenProps.indexOf(prop) > -1
                    possibleAnswer = (await prompt.call({
                        continue: {
                            description: 'No property matching ' + prop + ', please provide manual value',
                            hidden
                        }
                    })).continue
                    console.log(data_line + (hidden ? '******' : possibleAnswer))
                    childProcess.stdin.write(possibleAnswer + '\n')
                }, 3000)
            }
            lastDataLine = data_line
            data_line = ''
        })

        let stdOutErrLine = ''
        childProcess.stdout.on('error', function (data) {
            if (timeout) {
                clearTimeout(timeout)
            }
            stdOutErrLine += data
            if (stdOutErrLine.indexOf("\n") > -1 && stdOutErrLine.replace(/\s/g, '').length) {
                console.error('__GLOBAL__ERROR__')
                console.error(data.toString())
                stdOutErrLine = ''
            }
        })

        let stdErrLine = ''
        childProcess.stderr.on("data", function (data) {
            if (timeout) {
                clearTimeout(timeout)
            }
            stdErrLine += data
            if (stdErrLine.indexOf("\n") > -1 && stdErrLine.replace(/\s/g, '').length) {
                console.error(data + '')
                stdErrLine = ''
            }
            timeout = setTimeout(() => {
                childProcess.kill()
            }, 10000)
        })
    }

    return new Promise((resolve) => {
        childProcess.on('exit', function () {
            clearTimeout(timeout)
            childProcess.kill()
            resolve()
        })
    })
}
