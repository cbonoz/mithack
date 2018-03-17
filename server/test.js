/**
 * Created by cbuonocore on 3/16/18.
 */

// transaction id i think: 0xd65d38e5fddf7748a4d80b79adb1c32e1371c7f4


const neonjs = require('@cityofzion/neon-js');
const rekeyed = require('./rekeyed');
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

    const config = {
    name: "PrivateNet",
    // net: "http://testnet-api.wallet.cityofzion.io",
    net: "http://localhost:5000",
    extra: {
        // neoscan: "https://coz.neoscan-testnet.io/api/main_net"
        neoscan: "http://localhost:4000/api/main_net"
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
    // intents: [{
    //     assetId: CONST.ASSET_ID.GAS,
    //     value: 0.00000001,
    //     scriptHash: Neon.get.scriptHashFromAddress(account.address)
    // }]
};

const privateNet = new rpc.Network(config)
Neon.add.network(privateNet)

// api.neoscan.getBalance('PrivateNet', account.address)
//     .then(res => console.log(res))
//     .catch(err => console.log(err))

// Neon.doInvoke(config).then(res => {
//   console.log(res)
// })
// .catch(err => console.log(err))
//
// Neon.get.balance('PrivateNet', account.address)
// .then(res => console.log(res))
// .catch(res => console.log(res))

// const query = Neon.create.query()

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
