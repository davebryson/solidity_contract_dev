'use strict';


var Helpers = {

  contractFactory: function(web3, address, abi) {
    var contractAbi = web3.eth.contract(abi);
    return contractAbi.at(address);
  },

  deploy: function(web3, from, contractInfo) {
    var tx = {
      from: from,
      gas: 600000,
      data: contractInfo.code
    };
    return new Promise(function(accept, reject) {
      web3.eth.sendTransaction(tx, function(err, hash) {
        if (err != null) {
          return reject(err);
        }

        var interval = setInterval(function() {
          web3.eth.getTransactionReceipt(hash, function(err, receipt) {
            if (err != null) {
              clearInterval(interval);
              return reject(err);
            }
            if (receipt != null) {
              console.log("Deployed " + contractInfo.name + " to address: " + receipt.contractAddress);
              accept({
                name: contractInfo.name,
                address: receipt.contractAddress
              });
              clearInterval(interval);
            }
          });
        }, 500);
      })
    })
  }
};

module.exports = Helpers;
