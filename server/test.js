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
const privateKey = "9cb1830a0f1fefaa59b01cfbce6f5aa29de21e5226556649950d4ef0e7c43054";
// const account = new wallet.Account(privateKey)
const account = Neon.create.account(privateKey)

console.log(account.address)
let tx = Neon.create.tx({type: 128})

const config = {
    name: "TestNet",
    net: "http://testnet-api.wallet.cityofzion.io",
    extra: {
        neoscan: "https://coz.neoscan-testnet.io/api/main_net"
    },
    script: Neon.create.script({
        scriptHash: account.scriptHash,
        operation: 'retrieve',
        args: [Neon.u.reverseHex('cef0c0fdcfe7838eff6ff104f9cdec2922297537')]
    }),
    address: account.address, // ATXdMX5LkxH4rq5y8rv3iLdfvfCT8sxW8k
    privateKey: privateKey,
    publicKey: account.publicKey,
    gas: 1,
    intents: [{
        assetId: CONST.ASSET_ID.GAS,
        value: 0.00000001,
        scriptHash: Neon.get.scriptHashFromAddress(account.address)
    }]
};

const privateNet = new rpc.Network(config)
Neon.add.network(privateNet)
neonjs.settings.httpsOnly = false

api.neoscan.getBalance('TestNet', account.address)
    .then(res => console.log(res))
    .catch(err => console.log(err))

// Neon.doInvoke(config).then(res => {
//   console.log(res)
// })
// .catch(err => console.log(err))

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
