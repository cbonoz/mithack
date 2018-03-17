// Helper utilities for the rekeyed server.
const library = (function() {
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
        net: NETWORK,
        privateKey: privateKey,
        address: account.address,
        gas: 0,
    }

    function saveFileMetadata(metadata, address, hash) {
        const script = Neon.create.script({
            scriptHash: "23ba2703c53263e8d6e522dc32203339dcd8eee9",
            operation: 'store',
            // args: sc.ContractParam.array(param1, Neon.u.reverseHex('cef0c0fdcfe7838eff6ff104f9cdec2922297537'))
            args: sc.ContractParam.array(address, metadata))
        });

        config.script = script;

        Neon.doInvoke(config)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    function retrieveFileMetadata(address, hash) {
        const script = Neon.create.script({
            scriptHash: "23ba2703c53263e8d6e522dc32203339dcd8eee9",
            operation: 'retrieve',
            // args: sc.ContractParam.array(param1, Neon.u.reverseHex('cef0c0fdcfe7838eff6ff104f9cdec2922297537'))
            args: sc.ContractParam.array(address + "_" + hash);
        });

        config.script = script;

        Neon.doInvoke(config)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    return {
        neonjs: neonjs,
        api: api,
        saveFileMetadata: saveFileMetadata,
    };

})();
module.exports = library;
