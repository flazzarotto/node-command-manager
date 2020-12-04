import fs from 'fs'
import console from '../Command/ConsoleColor'

let version = null

function getVersion(packageJsonDir) {
    if (version) {
        return version
    }
    try {
        version = JSON.parse(fs.readFileSync((packageJsonDir+'/')
            .replace(/\/+$/,'/') + 'package.json').toString()).version
    }
    catch (e) {
        version = '0.0.0'
        console.warn('Unable to find package.json ('+e.message+'). Using version ' + version + ' instead.')
    }
    return version
}

function updateVersion(type, packageJsonFile) {
    let version = getVersion(packageJsonFile)
    let types = {M: 0, m: 1, r: 2}
    if (types[type] === undefined) {
        throw new Error(`Version type ${type} not recognized. Available types `
            + `are ${JSON.stringify(Object.keys(types))}`)
    }
    let v = version.split('.')
    v[types[type]] = parseInt(v[types[type]]) + 1

    for (let subVersion = types[type] + 1; subVersion < 3; subVersion++) {
        v[subVersion] = 0
    }

    version = v.join('.')
    return version
}

export {getVersion, updateVersion}
