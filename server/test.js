/**
 * Created by cbuonocore on 3/16/18.
 */


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

console.log(account.address)
// console.log(Neon.create.privateKey())
const config = {
    name: "PrivateNet",
    net: "http://testnet-api.wallet.cityofzion.io",
    // net: "http://localhost:30333",
    extra: {
        neoscan: "https://coz.neoscan-testnet.io/api/main_net"
        // neoscan: "http://localhost:4000/api/main_net"
    },
    script: Neon.create.script({
        scriptHash: account.scriptHash,
        operation: 'retrieve',
        args: [Neon.u.reverseHex('cef0c0fdcfe7838eff6ff104f9cdec2922297537')]
    }),
    address: account.address, // ATXdMX5LkxH4rq5y8rv3iLdfvfCT8sxW8k
    privateKey: privateKey,
    publicKey: account.publicKey,
    gas: 0,
    intents: [{
        assetId: CONST.ASSET_ID.GAS,
        value: 0.00000001,
        scriptHash: Neon.get.scriptHashFromAddress(account.address)
    }]
};

const privateNet = new rpc.Network(config)
Neon.add.network(privateNet)

api.neoscan.getBalance('PrivateNet', account.address)
    .then(res => console.log(res))
    .catch(err => console.log(err))

Neon.doInvoke(config).then(res => {
  console.log(res)
})
.catch(err => console.log(err))

// const rekeyed = require('./rekeyed');

// const query = Neon.create.query()

// const privateNet = new rpc.Network(config);
// Neon.add.network(privateNet)

// console.log(address)
// Neon.doInvoke(config).then(res => {
//   console.log(res)
// })
// .catch(error => console.log(error))

// api.neoscan.getBalance('PrivateNet', address)
// .then(res => console.log(res))
// .catch(error => console.log(error))

// console.log(privateNet);

// const props = {
//   scriptHash: '5b7074e873973a6ed3708862f219a6fbf4d1c411', // Scripthash for the contract
//   operation: 'balanceOf', // name of operation to perform.
//   args: [Neon.u.reverseHex('cef0c0fdcfe7838eff6ff104f9cdec2922297537')] // any optional arguments to pass in. If null, use empty array.
// }
//
// const script = Neon.create.script(props)
//
// rpc.Query.invokeScript(script)
//   .execute('http://seed3.neo.org:20332')
//   .then(res => {
//     console.log(res) // You should get a result with state: "HALT, BREAK"
//   })
