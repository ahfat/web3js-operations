const config = require('./config');
const Web3 = require('web3')

const rpcURL = config.common.rpcURL
const web3 = new Web3( rpcURL )
const privateKey1 = '0x' + config.common.privateKey1

const abi = config.events.abi
const contractAddress = config.events.contractAddress
const contract = new web3.eth.Contract( abi, contractAddress )

// read all events
contract.getPastEvents (
    'allEvents',
    {
      fromBlock: 0,
      toBlock: 'latest'
    }
)
.then( (events) => {
    for( i of events ) {
        console.log( 'All events: ' + i.event + ' from: ' + i.returnValues.from + ' +' + i.returnValues.value + ' =' + i.returnValues.number )
    }
})
.catch( (error) => {
    console.log( 'Error: ', error )
})

// increment number
const _value = 5
const txObject = contract.methods.increment( _value )
const encodedTxObject = txObject.encodeABI()

//gas estimation
txObject.estimateGas( (error, gas) => {
    console.log( 'Estimated gas: ', gas )
})
.then( (gas) => {
    console.log( 'encoded tx: ', encodedTxObject )
    // sign transaction
    return web3.eth.accounts.signTransaction(
        {
            to: contractAddress, // must supply, otherwise create a new contract
            data: encodedTxObject,
            gas: gas,
            gasLimit: web3.utils.toHex( 55000 ),
            gasPrice: web3.utils.toHex( web3.utils.toWei('10', 'gwei') )            
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

// increment number (only applicable to private testnet, unlock account)
// const _value = 3
// console.log( 'increment: ' , _value)
// contract.methods.increment( _value ).send(
//     {
//         from: '0x' + accountAddress1
//     }
// )
// .then( (result) => {
//     console.log(result)
// })
// .catch( (error) => {
//     console.log( 'Error: ', error )
// })