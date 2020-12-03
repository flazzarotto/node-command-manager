export function isCallable(maybeCallable) {
    let ts = {}.toString.bind(maybeCallable.call || '')
    return ts().toLowerCase().indexOf('function') > -1
}