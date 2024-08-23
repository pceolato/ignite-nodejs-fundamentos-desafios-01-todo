// /users/:id/
export function buildRoutePatch(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g;
    const pathWWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)');

    const pathRegex = new RegExp(`^${pathWWithParams}(?<query>\\?(.*))?$`);

    return pathRegex
}
