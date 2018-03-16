var Neon = neonjs.default;
var api = neonjs.api;

// const query = Neon.create.query()

// Named imports are available too
// var wallet = neon-js.wallet
// var tx = neon-js.tx
//
// const account = new wallet.Account(privateKey)
const intent = api.makeIntent({NEO:1, GAS:1}, 'ALq7AWrhAueN6mJNqk6FHJjnsEoPRytLdW');

const config = {
  net: 'TestNet', // The network to perform the action, MainNet or TestNet.
  address: 'ALfnhLg7rUyL6Jr98bzzoxz5J7m64fbR4s',  // This is the address which the assets come from.
  privateKey: '9ab7e154840daca3a2efadaf0df93cd3a5b51768c632f5433f86909d9b994a69',
  intents: intent
}

Neon.sendAsset(config)
.then(config => {
  console.log(config.response)
})
.catch(config => {
  console.log(config)
})
