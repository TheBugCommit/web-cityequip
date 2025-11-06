const buildPaths = (prefix, pathsObject) => {
    const fullPaths = {}
    const cleanPrefix = (prefix === '/') ? '' : prefix

    for (const key in pathsObject) {
        const relativePath = pathsObject[key]
        
        if (typeof relativePath === 'function') {
            fullPaths[key] = (...args) => {
                return cleanPrefix + relativePath(...args)
            }
        } else {
            if (cleanPrefix === '' && relativePath === '/') {
                fullPaths[key] = '/'
            } else {
                fullPaths[key] = cleanPrefix + relativePath
            }
        }
    }
    return fullPaths
}

export default buildPaths