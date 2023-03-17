const config = require('./config');
const Web3 = require('web3')

const rpcURL = config.common.rpcURL
const web3 = new Web3( rpcURL )

const abi = config.functioncall.abi
const contractAddress = config.functioncall.contractAddress
const contract = new web3.eth.Contract( abi, contractAddress )

// query number value
contract.methods.number().call()
.then( (number) => {
    console.log( 'number: ', number )
})
.catch( (error) => {
    console.log( 'Error: ', error )
})
