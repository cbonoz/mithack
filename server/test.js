/**
 * Created by cbuonocore on 3/16/18.
 */

const privateKey = "9cb1830a0f1fefaa59b01cfbce6f5aa29de21e5226556649950d4ef0e7c43054";

const neonjs = require('@cityofzion/neon-js');
const rpc = neonjs.rpc;
const wallet = neonjs.wallet;
const Neon = neonjs.default;
const api = neonjs.api;

const address = new wallet.Account(privateKey)

const config = {
  name: "TestNet",
  // net: "http://localhost:20333",
  // script: Neon.create.script({
  //     scriptHash: '23ba2703c53263e8d6e522dc32203339dcd8eee9',
  //     operation: 'store',
  //     args: [Neon.u.reverseHex('cef0c0fdcfe7838eff6ff104f9cdec2922297537')]
  // })
};

const newNet = new rpc.Network(config)
Neon.add.network(newNet)

Neon.doInvoke(config).then(res => {
  console.log(res)
})
.catch(err => console.log(err))
// Neon.get.balance("TestNet", "AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y")
// .then(res => console.log(res))
// .catch(err => console.log(err))


const rekeyed = require('./rekeyed');

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
