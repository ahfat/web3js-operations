const config = require('./config');
const Web3 = require('web3')

const rpcURL = config.common.rpcURL
const web3 = new Web3( rpcURL )
const privateKey1 = '0x' + config.common.privateKey1

const bytecode = '0x' + config.deploy.bytecode
const abi = config.deploy.abi

const contract = new web3.eth.Contract( abi )
// create transaction object
var txObject = {
    data: bytecode,
    arguments: [22]
}
// encode ABI
const encodedTxObject = contract.deploy( txObject ).encodeABI()
//console.log( 'EncodedABI: ', encodedTxObject )

//gas estimation
contract.deploy( txObject )
.estimateGas( (error, gas) => {
    console.log( 'Estimated gas: ', gas )
})
.then( (gas) => {
    console.log( encodedTxObject )
    // sign transaction
    return web3.eth.accounts.signTransaction(
        {
            data: encodedTxObject,
            gas: gas
        },
        privateKey1
    )
})
.then( (signedTx) => {
    // send transaction
    console.log( 'signedTx:', signedTx )
    return web3.eth.sendSignedTransaction( signedTx.rawTransaction )
})
.then( (result) => {
    console.log( 'sent signed tx: ', JSON.stringify(result, null, ' '));
})
.catch( (error) => {
    console.log( 'Error: ', error )
})

// only applicable to private network account unlocked
// contract.deploy({
//     data: bytecode,
//     arguments: [22]
// })
// .send({
//     from: '0x' + accountAddress1,
//     gas: 180046, //value from gas estimation
//     gasPrice: web3.utils.toHex( web3.utils.toWei('10', 'gwei'))
// })
// .on( 'error', (error) => {
//     console.log( 'Error: ', error )
// })
// .then( (newContract) => {
//     console.log( newContract.address )
// })