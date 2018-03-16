/**
 * Created by cbuonocore on 3/16/18.
 */

const library = (function () {
    const PORT = 9001;
    // TODO: replace with prod endpoint.
    const BASE_URL = `http://localhost:${PORT}`;

    const axios = require('axios');

    const getHeaders = () => {
        const token = localStorage.getItem("tok");
        return {
            headers: { Authorization: "Bearer " + token }
        };
    };

    // TODO: add support for deleting issues (or just mark deleted).
    // function postDeleteIssue(userId, issueId) {
    //     const url = `${BASE_URL}/api/issue/delete`;
    //     return axios.post(url, {
    //         userId: userId,
    //         issueId: issueId
    //     }, getHeaders()).then(response => {
    //         const data = response.data;
    //         return data;
    //     });
    // }
    //
    // function getToggleActiveForIssueId(issueId) {
    //     const url = `${BASE_URL}/api/issue/toggle/${issueId}`;
    //     return axios.get(url, getHeaders()).then(response => response.data);
    // }

    function postFile(body) {
        const url = `${BASE_URL}/api/file`;
        return axios.post(url, {
            body: body
        }, getHeaders()).then(response => {
            const data = response.data;
            return data;
        });
    }

    return {
        BASE_URL: BASE_URL,
        postFile: postFile
    }

})();
module.exports = library;

