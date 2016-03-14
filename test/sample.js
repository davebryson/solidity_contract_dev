
var assert = require('assert');
var Web3 = require('web3');

// Make sure geth or testrpc is running...
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Use the helper
var helper = require('../libs/test_helpers.js');
// Load the contract info
var hello = require('../build/hello.sol.js');

describe('Contacts', function(done) {
  var accounts = [];

  before(function(done) {
    accounts = web3.eth.accounts;
    done();
  });

  it('should have some accounts', function(done) {
    assert(accounts.length > 0);
    done();
  });

  it('should deploy contract and return and address', function(done) {
    helper.deploy(web3, accounts[0], hello).then(function(results) {
      assert.ok(results.address);
    }).then(done).catch(done);
  });

});
