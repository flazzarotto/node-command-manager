import fs from 'fs'

let version

try {
    version =
        JSON.parse(fs.readFileSync(__dirname + '/../../packageJson.json').toString()).version
}
catch (e) {
    version = '1.0.0'
}

function updateVersion(type) {
    let types = {M: 0, m: 1, r: 2}
    if (types[type] === undefined) {
        throw new Error(`Version type ${type} not recognized. Available types `
            + `are ${JSON.stringify(Object.keys(types))}`)
    }
    let v = version.split('.')
    v[types[type]] = parseInt(v[types[type]]) + 1
    version = v.join('.')
    return version
}

export {version, updateVersion}
