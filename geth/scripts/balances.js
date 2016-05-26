
console.log("Account balances:");
console.log("-----------------");

for (i = 0; i < eth.accounts.length; i++) {
  var acct = eth.accounts[i];
  var bal = web3.fromWei(eth.getBalance(acct), 'ether');
  console.log(acct + " : " + bal + " ether");
}
