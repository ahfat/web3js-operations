const config = require('./config');
const Web3 = require('web3')

const wsURL = config.common.wsURL
const web3 = new Web3( wsURL )

const abi = config.events.abi
const contractAddress = config.events.contractAddress
const contract = new web3.eth.Contract( abi, contractAddress )

// for Websocket provider only, wss://...
contract.events.numberIncreased()
.on( 'connected', (subscriptionId) => {
    console.log( subscriptionId )
})
.on( 'data', (event) => {
    console.log( event )
})
.on( 'changed', (result) => {
    console.log( result )
})
.on( 'error', (error, result) => {
    console.log( 'Error: ', error )
})