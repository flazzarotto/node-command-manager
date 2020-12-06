export const colorCodes = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    fgBlack: "\x1b[30m",
    fgRed: "\x1b[31m",
    fgGreen: "\x1b[32m",
    fgYellow: "\x1b[33m",
    fgBlue: "\x1b[34m",
    fgMagenta: "\x1b[35m",
    fgCyan: "\x1b[36m",
    fgWhite: "\x1b[37m",
    bgBlack: "\x1b[40m",
    bgRed: "\x1b[41m",
    bgGreen: "\x1b[42m",
    bgYellow: "\x1b[43m",
    bgBlue: "\x1b[44m",
    bgMagenta: "\x1b[45m",
    bgCyan: "\x1b[46m",
    bgWhite: "\x1b[47m",
    noColor: '\x1b[0m'
}

function strArgs(args) {
    return '%s'

    // let array = Object.values(args).map(param => '%'+(typeof param).charAt(0))
    // console.log(array)
    // return array.join('')
}

let defaultColors = {
    log: null,
    error: colorCodes.bgRed + colorCodes.fgWhite,
    info: colorCodes.bgCyan + colorCodes.fgWhite,
    warn: colorCodes.fgYellow
}

export default {
    _setCustomColors({log, error, info, warn} = defaultColors) {
        defaultColors = {...defaultColors, log, error, info, warn}
    },
    log() {
        if (defaultColors.log) {
            this.writeColor(defaultColors.log + strArgs(arguments), 'warn', arguments)
            return
        }
        console.log(...arguments)
    },
    error() {
        this.writeColor( defaultColors.error + strArgs(arguments), 'error', arguments)
    },
    info() {
        this.writeColor(defaultColors.info + strArgs(arguments), 'info', arguments)
    },
    warn() {
        this.writeColor(defaultColors.warn + strArgs(arguments), 'warn', arguments)
    },
    writeColor(colors, type = 'log', rest) {
        for (let color in colorCodes) {
            colors = colors.replace(new RegExp(color, 'g'), colorCodes[color])
        }
        colors += colorCodes.noColor
        console[type](colors, ...rest)
    },
}
