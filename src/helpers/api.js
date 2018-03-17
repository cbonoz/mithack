/**
 * Created by cbuonocore on 3/16/18.
 */

const library = (function () {
    const PORT = 9001;
    // TODO: replace with prod endpoint.
    const BASE_URL = `http://localhost:${PORT}`;

    const axios = require('axios');
    const sha256 = require('js-sha256').sha256;
    const neonjs = require('@cityofzion/neon-js');
    const Neon = neonjs.default;

    const TEST_DEMO_ADDRESS = "AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y";
    const TEST_FILE_NAME = "java.jpg";

    const getHeaders = () => {
        const token = localStorage.getItem("tok");
        return {
            headers: {Authorization: "Bearer " + token}
        };
    };

    function hashData(key, data) {
        return sha256.hmac(key, data);
    }

    function capLength(s, length) {
        if (!s) {
            return s;
        }

        if (!length) {
            length = 25;
        }

        const maxLen = Math.min(s.length, length);
        if (s.length > length) {
            // console.log('s', s);
            return s.substr(0, maxLen) + "...";
        }
        return s

    }

    function createTestMetaData(name, address) {
        const d = new Date();
        const now = d.toLocaleDateString() + " " + d.toLocaleTimeString();

        const privateKey = Neon.create.privateKey();
        const account = Neon.create.account(privateKey);
        let publicKey = account.publicKey;

        if (!address) {
            address = account.address;
        }

        if (!name) {
            name = TEST_FILE_NAME;
        }

        return {
            name: name,
            timesViewed: 1,
            lastAccessed: now,
            lastModifiedDate: now,
            sizeKb: parseInt(Math.random() * 10000) + "kb",
            address: capLength(address),
            hash: capLength(hashData(publicKey, now)),
            key: capLength(publicKey)
        };
    }

    function createMetaData(file, fileDate, fileHash, address, key, timesViewed) {
        return {
            hash: capLength(fileHash),
            name: file.name,
            timesViewed: timesViewed,
            lastAccessed: fileDate,
            lastModifiedDate: fileDate,
            sizeKb: file.sizeKb,
            address: capLength(address),
            key: capLength(key)
        }
    }

    // User request for granting permissions to another external user (by address) for accessing/downloading this file.
    function postGrantAccess(fileName, targetPublicKey, ownerPrivateKey) {
        const url = `${BASE_URL}/api/file`;
        return axios.post(url, {
            fileName: fileName,
            targetPublicKey: targetPublicKey,
            ownerPrivateKey: ownerPrivateKey
        }).then(response => {
            const data = response.data;
            return data;
        });
    }

    function postUploadFile(file, metadata) {
        const url = `${BASE_URL}/api/upload`;

        const formData = new FormData();
        formData.append("metadata", JSON.stringify(metadata));
        formData.append("file", file);

        return axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            const data = response.data;
            return data;
        });
    }

    function getFileMetadatasForAddress(address) {
        const url = `${BASE_URL}/api/files/${address}`;
        return axios.get(url, getHeaders()).then(response => response.data);
    }

    function postGetFile(address, fileName) {
        const url = `${BASE_URL}/api/file`;
        return axios.post(url, {
            address: address,
            fileName: fileName
        }).then(response => {
            const data = response.data;
            return data;
        });
    }

    return {
        BASE_URL: BASE_URL,
        TEST_DEMO_ADDRESS: TEST_DEMO_ADDRESS,
        TEST_FILE_NAME: TEST_FILE_NAME,
        capLength: capLength,
        createMetaData: createMetaData,
        createTestMetaData: createTestMetaData,
        hashData: hashData,
        postUploadFile: postUploadFile,
        postGrantAccess: postGrantAccess,
        postGetFile: postGetFile,
        getFileMetadatasForAddress: getFileMetadatasForAddress
    }

})();
module.exports = library;

