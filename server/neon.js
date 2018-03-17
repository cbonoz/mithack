// Helper utilities for the rekeyed server.
const library = (function () {
    const neonjs = require('@cityofzion/neon-js');
    const rpc = neonjs.rpc;
    const wallet = neonjs.wallet;
    const Neon = neonjs.default;
    const api = neonjs.api;
    const logging = neonjs.logging;
    const CONST = neonjs.CONST;
    logging.logger.setAll('info');
    const privateKey = "KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr";
    const account = Neon.create.account(privateKey)
    const NETWORK = 'TestNet';

    const config = {
        name: NETWORK,
        net: "http://testnet-api.wallet.cityofzion.io",
        address: account.address,  // This is the address which the assets come from.
        privateKey: privateKey,
        publicKey: account.publicKey,
        gas: 0,
    };

    function saveFileMetadata(metadata, publickey, hash) {
        // This would return a promise for saving the metadata to the neo blockchain.
    }

    return {
        neonjs: neonjs,
        api: api,
        saveFileMetadata: saveFileMetadata,
    };

})();
module.exports = library;
