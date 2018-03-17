/**
 * Created by cbuonocore on 3/16/18.
 */

const library = (function () {
    const PORT = 9001;
    // TODO: replace with prod endpoint.
    const BASE_URL = `http://localhost:${PORT}`;

    const axios = require('axios');
    const sha256 = require('js-sha256').sha256;

    const getHeaders = () => {
        const token = localStorage.getItem("tok");
        return {
            headers: {Authorization: "Bearer " + token}
        };
    };

    function createTestMetaData() {
        const d = new Date();
        const now = d.toLocaleDateString() + " " + d.toLocaleTimeString();
        return {
            // name: "test.txt",
            lastModifiedDate: now,
            sizeKb: parseInt(Math.random() * 10000) + "kb",
            owner: "XXXXXXX", // address
            hash: "XXXXX"
        };
    }

    function hashFile(privateKey, data) {
        return sha256.hmac(privateKey, data);
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
        createMetaData: createMetaData,
        createTestMetaData: createTestMetaData,
        hashFile: hashFile,
        postUploadFile: postUploadFile,
        postGrantAccess: postGrantAccess,
        postGetFile: postGetFile,
        getFileMetadatasForAddress: getFileMetadatasForAddress
    }

})();
module.exports = library;

