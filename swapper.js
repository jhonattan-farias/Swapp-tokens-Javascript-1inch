const { get } = require('axios')
const Web3 = require('web3')
require('dotenv').config()

const web3 = new Web3('https://polygon-rpc.com/')
const { address } = web3.eth.accounts.wallet.add(process.env.WALLET_PRIVATE_KEY)

async function swapper() {
    try {
        const response = await get(`https://api.1inch.io/v4.0/137/swap?fromTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&toTokenAddress=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174&amount=100000000000000000&fromAddress=${address}&slippage=0.1&gasLimit=1000000`)
        const tx = await web3.eth.sendTransaction(response.data.tx)

        if(tx.status){
            console.log('Success!')
        }
    
    } catch(err) {
        console.log(err)
    }
}

swapper()