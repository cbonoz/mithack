/**
 * Created by cbuonocore on 3/16/18.
 */

// Helper utilities for the rekeyed server.
const library = (function () {

    const PythonShell = require('python-shell');

    function encryptAndSaveFile(fileContent, fileName) {
        const options = {
            mode: 'text',
            pythonPath: 'python3',
            pythonOptions: ['-u'], // get print results in real-time
            scriptPath: 'path/to/my/scripts',
            args: [fileContent, fileName]
        };

    }

    function decryptAndReturnFile(file) {

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


    pyProg.stdout.on('data', function(data) {

        console.log(data.toString());
        res.write(data);
        res.end('end');

    });

    return {
        capitalize: capitalize,
        getRandom: getRandom,
        formatDateTimeMs: formatDateTimeMs
    };

})();
module.exports = library;

