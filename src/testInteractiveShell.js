import {interactiveShell} from "./Command/interactiveShell"
import 'regenerator-runtime/runtime'
import 'core-js'

const publishArgs = ['publish', '--access=public', '--color always']
;(async() => {
    await interactiveShell('npm', ['login'], {'username': 'caca', 'email.+': 'any'})
    await interactiveShell('npm', publishArgs, null, null, false)
})()
