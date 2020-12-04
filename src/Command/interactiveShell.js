import cp from 'child_process'

const normalize = string => string.replace(/[^\w\d]/ig, '').toLowerCase()

/**
 * Provides a simple interactive shell to answer prompts
 * @param cmd
 * @param args
 * @param arrayOfAnswers
 * @param done callbackFunction
 */
export function interactiveShell(cmd, args, arrayOfAnswers = {}, done = () => {}) {
    let data_line = ''

    let possibleAnswers = {}

    for (let property in arrayOfAnswers) {
        possibleAnswers[normalize(property)] = arrayOfAnswers[property]
    }

    const childProcess = cp.spawn(cmd, args)
    childProcess.stdout.setEncoding('utf8')
    childProcess.stdout.on("data", function (data) {
        data_line += data
        let prop = normalize(data_line)
        if (possibleAnswers[prop]) {
            console.info(data_line + (prop === 'password' ? '' : possibleAnswers[prop]))
            data_line = ''
            childProcess.stdin.write(possibleAnswers[prop] + '\n')
            delete possibleAnswers[prop]
        }
        else {
            console.warn(data_line)
        }
    })
    childProcess.stdout.on('error', function (data) {
        console.warn(data)
    })
    childProcess.stderr.on("data", function (data) {
        console.error(data)
    })
    childProcess.stdout.on("end", function (data) {
        console.info(data ?? '')
        done()
    })

}
