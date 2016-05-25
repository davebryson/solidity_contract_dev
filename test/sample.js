'use strict';
var assert = require('assert');
var Web3 = require('web3');
//var Promise = require('bluebird');

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

  it('should deploy contract and call contract', function(done) {
    helper.deploy(web3, accounts[0], hello).then(function(results) {
      assert.ok(results.address);
      var c = web3.eth.contract(hello.abi).at(results.address);

      assert.equal('hello', c.say.call());
      assert.equal('hey there', c.name.call());
      assert.equal(2, parseInt(c.fromArray.call(1)));
    }).then(done).catch(done);
  });
});
