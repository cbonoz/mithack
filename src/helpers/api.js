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
            lastAccessed: address,
            lastModifiedDate: now,
            sizeKb: parseInt(Math.random() * 10000) + "kb",
            address: address,
            hash: hashData(publicKey, now),
            key: publicKey
        };
    }

    function createMetaData(file, fileDate, fileHash, address, key) {
        return {
            hash: fileHash,
            name: file.name,
            lastModifiedDate: fileDate,
            sizeKb: file.sizeKb,
            address: address,
            key: key
        }
    }

    // User request for granting permissions to another external user (by address) for accessing/downloading this file.
    function postGrantAccess(file, privateKey, otherAddress) {
        // TODO: implement.
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

