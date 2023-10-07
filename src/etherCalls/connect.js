var ethers = require('ethers');  
var url = '127.0.0.1:8545';
var customHttpProvider = new ethers.JsonRpcProvider(url);
customHttpProvider.getBlockNumber().then((result) => {
    console.log("Current block number: " + result);
});