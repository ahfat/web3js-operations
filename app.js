const config = require('./config');
const Web3 = require('web3')

const rpcURL = config.app.rpcURL
const web3 = new Web3( rpcURL )
const accountAddress1 = config.app.accountAddress1
const accountAddress2 = config.app.accountAddress2
const privateKey1 = '0x' + config.app.privateKey1

// Get Account Balance
web3.eth.getBalance( accountAddress1 )
.then( (result) => {
    balance = web3.utils.fromWei( result, 'ether')
    console.log( 'Account #1: ', accountAddress1 )
    console.log( 'Balance: ', balance )
})
.catch( (error) => {
    console.log( 'Error: ', error )
})

web3.eth.getBalance( accountAddress2 )
.then( (result) => {
    balance = web3.utils.fromWei( result, 'ether')
    console.log( 'Account #2: ', accountAddress2 )
    console.log( 'Balance: ', balance )
})
.catch( (error) => {
    console.log( 'Error: ', error )
})

// Make transaction between accounts
// send to account 2
// var txObject = {
//     from:     '0x' + accountAddress1,
//     to:       '0x' + accountAddress2,
//     value:    web3.utils.toHex( web3.utils.toWei('0.2', 'ether') ),
//     gasLimit: web3.utils.toHex( 21000 ),
//     gasPrice: web3.utils.toHex( web3.utils.toWei('10', 'gwei') )
// }

// web3.eth.accounts.signTransaction( txObject, privateKey1 )
// .then( (signedTx) => {
//     return web3.eth.sendSignedTransaction( signedTx.rawTransaction )
// })
// .then( (result) => {
//     console.log( 'sent signed tx: ', JSON.stringify(result, null, ' '));
// })
// .catch( (error) => {
//     console.log( 'Error: ', error )
// })

// Query contract
const abi = config.app.abi
const contractAddress = config.app.contractAddress
const contract = new web3.eth.Contract( abi, contractAddress )
contract.getPastEvents (
    'allEvents',
    {
      fromBlock: 0,
      toBlock: 'latest'
    }
)
.then( (events) => {
    console.log( 'All events: ', events )
})
.catch( (error) => {
    console.log( 'Error: ', error )
})

contract.methods.Mycar().call()
.then( (result) => {
    console.log( 'Brand: ', result.Brand )
    console.log( 'Rnumber: ', result.Rnumber )
})
.catch( (error) => {
    console.log( 'Error: ', error )
})
