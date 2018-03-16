// Helper utilities for the rekeyed server.
const library = (function () {
    const neonjs = require('@cityofzion/neon-js');
    const Neon = neonjs.default;
    const api = neonjs.api;

    const NETWORK = 'TestNet';

    // Example send asset config
    const config = {
        net: NETWORK, // The network to perform the action, MainNet or TestNet.
        address: 'ALfnhLg7rUyL6Jr98bzzoxz5J7m64fbR4s',  // This is the address which the assets come from.
        privateKey: '9ab7e154840daca3a2efadaf0df93cd3a5b51768c632f5433f86909d9b994a69',
        intents: intent
    };

    function saveFileMetadata(metadata, publickey, hash) {

        // This would return a promise for saving the metadata to the neo blockchain.
    }

    return {
        Neon: Neon,
        api: api,
        saveFileMetadata: saveFileMetadata,
    };

})();
module.exports = library;

