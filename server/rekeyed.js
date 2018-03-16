/**
 * Created by cbuonocore on 3/16/18.
 */

// Helper utilities for the rekeyed server.
const library = (function () {

    // https://github.com/extrabacon/python-shell
    const PythonShell = require('python-shell');

    function encryptAndSaveFile(fileContent, fileName, cb) {
        const options = {
            mode: 'text',
            pythonPath: 'python3',
            pythonOptions: ['-u'], // get print results in real-time
            scriptPath: 'path/to/my/scripts',
            args: [fileContent, fileName]
        };

        // TODO: implement and invoke python with data callback.

        if (cb) {
            cb();
        }

    }

    function decryptAndReturnFile(file, cb) {
        // TODO: implement and invoke python with data callback.

        if (cb) {
            cb();
        }
    }

    const getRandom = (items) => {
        return items[Math.floor(Math.random()*items.length)];
    };

    const formatDateTimeMs = (timeMs) => {
        const date = new Date(parseInt(timeMs));
        return `${date.toDateString()} ${date.toLocaleTimeString()}`;
    };

    function capitalize(str) {
        if (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        return str;
    }

    return {
        capitalize: capitalize,
        getRandom: getRandom,
        formatDateTimeMs: formatDateTimeMs,
        encryptAndSaveFile: encryptAndSaveFile,
        decryptAndReturnFile: decryptAndReturnFile
    };

})();
module.exports = library;

