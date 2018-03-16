/**
 * Created by cbuonocore on 3/16/18.
 */

const privateKey = "9cb1830a0f1fefaa59b01cfbce6f5aa29de21e5226556649950d4ef0e7c43054";

const config = {
  name: "TestNet",
  "ProtocolConfiguration": {
    "Magic": 1010102,
    "AddressVersion": 23,
    "StandbyValidators": [
      "032d9e51c7d48b0f5cc63d63deb89767685832cf69eb7113900290f217ae0504ee",
      "022a5b7ccf03166a95e1750f0c350c734c34fe7aac66622eecdb5a529d2e69b1df",
      "03c478d43271c297696ee3ab5a7946ee60287015c7dca6cba867819c7f271bc4ea",
      "0393ef777d01fb60eef1da3474b975c6a393b464bcfe588e2ad7dbc4dbdfa2c244"
    ],
    "SeedList": [
      "188.68.34.29:10330",
      "188.68.34.29:10332",
      "188.68.34.29:10334",
      "188.68.34.29:10336"
    ],
    "SystemFee": {
      "EnrollmentTransaction": 1000,
      "IssueTransaction": 500,
      "PublishTransaction": 500,
      "RegisterTransaction": 10000
    }
  }
};

const neonjs = require('@cityofzion/neon-js');
const rpc = neonjs.rpc;
const wallet = neonjs.wallet;
const Neon = neonjs.default;
const api = neonjs.api;

const address = new wallet.Account(privateKey)

const rekeyed = require('./rekeyed');

const query = Neon.create.query()

const privateNet = new rpc.Network(config);
Neon.add.network(privateNet)

console.log(address)
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
