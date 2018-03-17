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
const sc = neonjs.sc;
const logging = neonjs.logging;
const CONST = neonjs.CONST;
// logging.logger.setAll('info');
const privateKey = "KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr";
const account = Neon.create.account(privateKey)

console.log(account.publicKey)

const param1 = sc.ContractParam.byteArray(account.address, 'address')

// const config = {
//     name: "PrivateNet",
//     net: "https://neoscan-testnet.io",
//     extra: {
//         neoscan: "https://neoscan-testnet.io/api/main_net"
//         // neoscan: "http://localhost:4000/api/main_net"
//     },
//     script: Neon.create.script({
//         scriptHash: "23ba2703c53263e8d6e522dc32203339dcd8eee9",
//         operation: 'store',
//         args: sc.ContractParam.array(param1, Neon.u.reverseHex('cef0c0fdcfe7838eff6ff104f9cdec2922297537'))
//     }),
//     address: account.address, // ATXdMX5LkxH4rq5y8rv3iLdfvfCT8sxW8k
//     privateKey: privateKey,
//     publicKey: account.publicKey,
//     gas: 0,
//     // intents: [{
//     //     assetId: CONST.ASSET_ID.GAS,
//     //     value: 0.00000001,
//     //     scriptHash: Neon.get.scriptHashFromAddress(account.address)
//     // }]
// };

const config = {
    net: "TestNet",
    privateKey: privateKey,
    address: account.address,
    gas: 0,
    script: Neon.create.script({
        scriptHash: "23ba2703c53263e8d6e522dc32203339dcd8eee9",
        operation: 'store',
        args: sc.ContractParam.array(param1, Neon.u.reverseHex('cef0c0fdcfe7838eff6ff104f9cdec2922297537'))
    }),
}

// const privateNet = new rpc.Network(config)
// Neon.add.network(privateNet)

// api.neoscan.getBalance('PrivateNet', account.address)
//     .then(res => console.log(res))
//     .catch(err => console.log(err))

Neon.doInvoke(config).then(res => {
        console.log(res)
    })
    .catch(err => console.log(err))

    // // const query = Neon.create.query()

const props = {
        scriptHash: '23ba2703c53263e8d6e522dc32203339dcd8eee9', // Scripthash for the contract
        operation: 'balanceOf', // name of operation to perform.
        args: [Neon.u.reverseHex('cef0c0fdcfe7838eff6ff104f9cdec2922297537')] // any optional arguments to pass in. If null, use empty array.
    }
    //
const script = Neon.create.script(props)

// rpc.Query.invokeScript(script)
//   .execute('http://localhost:30333')
//   .then(res => {
//     console.log(res) // You should get a result with state: "HALT, BREAK"
//   })
//   .catch(err => console.log(err))
