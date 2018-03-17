/**
 * Created by cbuonocore on 3/16/18.
 */

// Helper utilities for the rekeyed server.
const library = (function () {

    // https://github.com/extrabacon/python-shell
    const PYTHON_SCRIPT_FILE = "security.py";
    const PYTHON_SCRIPT_PATH = process.env['SCRIPT_PATH'] || "/Users/cbuonocore/personal/hackathon/mithack/server/";
    const PythonShell = require('python-shell');
    // const cmd = require('node-cmd');

    // TODO: replace with server python installation path.
    const PYTHON_PATH = process.env['PYTHON_PATH'] || "/Users/cbuonocore/anaconda3/bin/python3.6";// /Users/cbuonocore/personal/hackathon/mithack/server/pyUmbral";

    PythonShell.defaultOptions = {
        pythonPath: PYTHON_PATH,
        scriptPath: PYTHON_SCRIPT_PATH
    };

    function encryptAndSaveFile(fileContent, fileName, key, cb) {
        // const command = 'python3 security.py %s %s %s' % (fileContent, fileName, key);
        // console.log(command);
        // cmd.get(
        //     command,
        //     function(err, data, stderr){
        //         console.log(err, data, stderr);
        //         console.log('the current dir contains these files :\n\n',data)
        //     }
        // );

        PythonShell.run(PYTHON_SCRIPT_FILE, {
            args: ['encrypt', fileContent, fileName, key]
        }, cb)
    }

    function decryptAndReturnFile(fileName, cb) {
        // TODO: implement in security python script and invoke python with data callback.
        PythonShell.run(PYTHON_SCRIPT_FILE, {
            args: ['decrypt', fileName]
        }, cb)
    }

    const getRandom = (items) => {
        return items[Math.floor(Math.random() * items.length)];
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

