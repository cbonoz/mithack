/**
 * Created by cbuonocore on 3/16/18.
 */

const rekeyed = require('./rekeyed');

const fileContent = "test";
function toBytes(x) {return x.split('').map((s) => s.charCodeAt(0))}
const fileBytes = toBytes(fileContent);


const metadata = '{"json": "data"}';
const fileName = "address_filename.txt";
const key = null;


rekeyed.encryptAndSaveFile(fileBytes, fileName, key, (err, result) => {
    console.log('err', err);
    console.log('result', result);
});
