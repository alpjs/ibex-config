import parseJSON from 'parse-json-object-as-map';

// const _config = global._ibexConfig || {};

// To make obj fully immutable, freeze each object in obj.
// Also makes Array, Map and Set read-only.
function deepFreeze(obj) {
    if (obj instanceof Map) {
        obj.clear = obj.delete = obj.set = function () {
            throw new Error('map is read-only');
        };
    } else if (obj instanceof Set) {
        obj.add = obj.clear = obj.delete = function () {
            throw new Error('set is read-only');
        };
    }

    Object.getOwnPropertyNames(obj).forEach((name) => {
        let prop = obj[name];

        // Freeze prop if it is an object
        if (typeof prop == 'object' && !Object.isFrozen(prop)) {
            deepFreeze(prop);
        }
    });

    // Freeze self
    return Object.freeze(obj);
}

function existsConfig(dirname, name) {
    return System.import(`${dirname}${name}.json!text`)
        .catch(() => false)
        .then(res => !!res);
}

function loadConfig(dirname, name) {
    return System.import(`${dirname}${name}.json!text`)
        .then(res => parseJSON(res));
}

export default function aukConfig(dirname) {
    dirname = dirname.replace(/\/*$/, '/');
    return async function (app) {
        app.existsConfig = (name) => existsConfig(dirname, name);
        app.loadConfig = (name) => loadConfig(dirname, name);

        const config = await loadConfig(dirname, 'common');

        if (app.environment) {
            for (let [key, value] of await loadConfig(dirname, app.environment)) {
                config.set(key, value);
            }
        }

        if (existsConfig(dirname, 'local')) {
            for (let [key, value] of await loadConfig(dirname, 'local')) {
                config.set(key, value);
            }
        }

        app.config = config;
        app.context.config = config;
        app.context.production = !!config.get('production');

        return deepFreeze(config);
    };
}
